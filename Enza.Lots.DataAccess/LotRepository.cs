using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Interfaces;
using Enza.Lots.DataAccess.Constants;
using Enza.Lots.DataAccess.Interfaces;
using Enza.Lots.Entities;
using Enza.Lots.Entities.BDTOs.Args;

namespace Enza.Lots.DataAccess
{
    public class LotRepository : Repository<Lot>, ILotRepository
    {
        public LotRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }

        public async Task<DataTable> GetLotsDataAsync(LotRequestArgs args)
        {
            var ds = await DbContext.ExecuteDataSetAsync(DataConstants.PR_GET_DATA_FOR_PROPERTY_FIELDSETS,
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

        public async Task<DataTable> GetLotsDataV2Async(LotRequestArgs args)
        {
            var p1 = new SqlParameter("@filters", args.GetFilters())
            {
                TypeName = "TVP_Filters"
            };
            var ds = await DbContext.ExecuteDataSetAsync(DataConstants.SP_LOTS_GET_LOTS,
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
    }
}
