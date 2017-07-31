using System.Data;
using System.Threading.Tasks;
using Enza.Batches.DataAccess.Constants;
using Enza.Batches.Entities;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.DataAccess.Abstracts;
using System.Data.SqlClient;
using Enza.Batches.DataAccess.Interfaces;
using Enza.DataAccess.Interfaces;

namespace Enza.Batches.DataAccess
{
    public class BatchRepository : Repository<Batch>, IBatchRepository
    {
        private readonly IAdminDatabase adminDbContext;

        public BatchRepository(IAnalysisDatabase dbContext, IAdminDatabase adminDbContext) : base(dbContext)
        {
            this.adminDbContext = adminDbContext;
        }

        public async Task<DataTable> GetBatchesDataAsync(BatchRequestArgs args)
        {
            var ds = await DbContext.ExecuteDataSetAsync(DataConstants.SP_GET_DATA_FOR_PROPERTY_FIELDSETS,
                CommandType.StoredProcedure,
                parameter =>
                {
                    parameter.Add("@FieldsetID", args.PFSID);
                    parameter.Add("@EntityTypeCode", args.ETC);
                    parameter.Add("@EZIDS", args.EZIDS);
                    parameter.Add("@TraitIDs", args.PCOLS);
                });
            if (ds.Tables.Count > 0)
                return ds.Tables[0];
            return null;
        }

        public async Task<DataTable> GetBatchesDataV2Async(BatchRequestArgs args)
        {
            var p1 = new SqlParameter("@filters", args.GetFilters())
            {
                TypeName = "TVP_Filters"
            };
            var ds = await DbContext.ExecuteDataSetAsync(DataConstants.SP_BATCH_GET_BATCHES,
                CommandType.StoredProcedure,
                parameter =>
                {
                    parameter.Add("@CropCode", args.CropCode);
                    parameter.Add("@ETC", args.ETC);
                    parameter.Add("@traitIDs", args.PCOLS);
                    parameter.Add("@filters", p1);
                });

            if (ds.Tables.Count > 0)
                return ds.Tables[0];
            return null;
        }

        public async Task<string> CreateBatchAsync(CreateBatchRequestArgs args)
        {
            var dt = args.GetDataTable();
            var p1 = new SqlParameter("@TVPBatch", dt)
            {
                TypeName = "TVP_CreateTempData"
            };
            var result = await adminDbContext.ExecuteDataSetAsync(DataConstants.SP_BATCH_CREATEBATCH,
                CommandType.StoredProcedure,
                parameter =>
                {
                    parameter.Add("@CropCode", args.CC);
                    parameter.Add("@TVPBatch", p1);
                });
            if (result.Tables.Count > 0)
            {
                if (result.Tables[0].Rows.Count > 0)
                    return "SUCCESS";
                else
                    return "FAIL";
            }
            return "FAIL";
        }
    }
}
