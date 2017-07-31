using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.Trial.DataAccess.Constants;
using Enza.Trial.Entities.BDTOs.Args;
using System.Data.SqlClient;
using Enza.DataAccess.Interfaces;
using Enza.Trial.DataAccess.Interfaces;

namespace Enza.Trial.DataAccess
{
    public class TrialRepository : Repository<Entities.Trial>, ITrialRepository
    {
        private readonly IAdminDatabase adminDbContext;
        public TrialRepository(IAnalysisDatabase dbContext, IAdminDatabase adminDbContext) : base(dbContext)
        {
            this.adminDbContext = adminDbContext;
        }

        public virtual async Task<DataSet> GetAllTrialAsync(CreateTrialRequestArgs args)
        {
            var query = "sp_Trial_GetTrialList";
            var result = await DbContext.ExecuteDataSetAsync(query, CommandType.StoredProcedure, parameter =>
              {
                  parameter.Add("@Crop", args.CC);
              });
            return result;
        }
        
        public async Task<DataTable> GetTrialsDataAsync(TrialRequestArgs args)
        {
            var ds = await DbContext.ExecuteDataSetAsync(DataConstant.PR_GET_DATA_FOR_PROPERTY_FIELDSETS,
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

        public async Task<DataTable> GetTrialsDataV2Async(TrialRequestArgs args)
        {
            var p1 = new SqlParameter("@filters", args.GetFilters())
            {
                TypeName = "TVP_Filters"
            };
            var ds = await DbContext.ExecuteDataSetAsync(DataConstant.SP_TRIALS_GET_TRIALS,
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

        public async Task<DataSet> CreateTrialAsync(CreateTrialRequestArgs args)
        {
            var query = "sp_Trial_CreateTrial";
            var dt = args.GetEZIDs();
            var p1 = new SqlParameter("@TVP_EZIDS", dt)
            {
                TypeName = "EZIDs"
            };
            var result = await adminDbContext.ExecuteDataSetAsync(query, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@CropCode", args.CC ?? "TO");
                parameter.Add("@TrialName", args.TrialName);
                parameter.Add("@TrialTypeID", args.TrialTypeID ?? 1);
                parameter.Add("@CountryCode", args.CountryCode ?? "NL");
                parameter.Add("@TrialRegionID", args.TrialRegionID);
                parameter.Add("@TVP_EZIDS", p1);

            });
            return result;
        }
    }
}
