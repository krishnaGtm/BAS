using System;
using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Interfaces;
using Enza.Trial.DataAccess.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;

namespace Enza.Trial.DataAccess
{
    public class TrialEntryRepository: Repository<Entities.Trial>, ITrialEntryRepository
    {
        private readonly IAdminDatabase adminDbContext;
        public TrialEntryRepository(IAnalysisDatabase dbContext, IAdminDatabase adminDbContext) : base(dbContext)
        {
            this.adminDbContext = adminDbContext;
        }
       
        public async Task<DataSet> GetTrialEntryByTrialAsync(TrialEntryRequestArgs args)
        {
            var query = "SP_Trial_GetTrialEntryByTrial";
            var result = await DbContext.ExecuteDataSetAsync(query, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@CropCode", args.CC);
                parameter.Add("@EZID", args.EZID);
               
            });
            return result;

        }
        public async Task<DataSet> CreateTrialEntryAsync(TrialEntryRequestArgs args)
        {
            var query = "SP_Trial_CreateTrialEntry";
            var result = await adminDbContext.ExecuteDataSetAsync(query, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@CropCode", args.CC);
                parameter.Add("@EZIDTrial", args.EZID);
                parameter.Add("@Module", args.Module);
                parameter.Add("@User", args.User);
            });
            return result;
        }

    }
}
