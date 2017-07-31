using System.Threading.Tasks;
using Enza.Crossing.Entities.BDTOs.Args;
using Enza.DataAccess.Abstracts;
using System.Data.SqlClient;
using Enza.Crossing.DataAccess.Constants;
using System.Data;
using Enza.Crossing.DataAccess.Interfaces;
using Enza.DataAccess.Interfaces;

namespace Enza.Crossing.DataAccess
{
    public class CrossingRepository: Repository<Entities.Crossing>, ICrossingRepository
    {
        private readonly IAdminDatabase adminDbContext;
        public CrossingRepository(IAnalysisDatabase dbContext, IAdminDatabase adminDbContext) : base(dbContext)
        {
            this.adminDbContext = adminDbContext;
        }
        public async Task<DataTable> GetCrossingDataAsync(CrossingRequestArgs args)
        {
            var ds = await DbContext.ExecuteDataSetAsync(DataConstant.SP_CROSSING_GETDATA_FORPROPERTYFIELDSETS,
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

        public async Task<DataTable> GetCrossingDataV2Async(CrossingRequestArgs args)
        {
            var p1 = new SqlParameter("@filters", args.GetFilters())
            {
                TypeName = "TVP_Filters"
            };
            var ds = await DbContext.ExecuteDataSetAsync(DataConstant.SP_CROSSING_GET_CROSSINGS,
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

        public async Task<DataTable> GetHierarchyAsync(int EZID)
        {
            var ds = await DbContext.ExecuteDataSetAsync("SP_Crossing_GetHierarcialData",
                CommandType.StoredProcedure,
                parameter =>
                {
                    parameter.Add("@EZID", EZID);                    
                });
            if (ds.Tables.Count > 0)
                return ds.Tables[0];
            return null;
        }

        public async Task<DataSet> CreateCrossing(CreateCrossingRequestArgs args)
        {
            var dt = args.GetDataTable();
            var p1 = new SqlParameter("@TVPCrossingTable", dt)
            {
                TypeName = "TVP_Crossing"
            };
            var result =
                await
                    adminDbContext.ExecuteDataSetAsync(DataConstant.SP_CROSSING_CREATE_CROSSING,
                        CommandType.StoredProcedure, parameter =>
                        {
                            parameter.Add("@TVPCrossingTable", p1);
                            parameter.Add("@CropCode", args.CC);
                            parameter.Add("@Module", args.Module);
                            parameter.Add("@User", args.User);

                        });
            return result;
        }
    }
}
