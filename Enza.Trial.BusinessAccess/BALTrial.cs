using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using System.Data;
using Enza.Trial.BusinessAccess.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Trial.DataAccess;
using Enza.Trial.DataAccess.Interfaces;

namespace Enza.Trial.BusinessAccess
{
    public class BALTrial : BusinessAccess<Entities.Trial>, IBALTrial
    {
        public BALTrial(ITrialRepository repository) : base(repository)
        {
        }

        public async Task<DataSet> GetAllTrialAsync(CreateTrialRequestArgs args)
        {
            return await ((TrialRepository) Repository).GetAllTrialAsync(args);
        }

        public async Task<DataSet> CreateTrialAsync(CreateTrialRequestArgs args)
        {
            return await ((TrialRepository) Repository).CreateTrialAsync(args);
        }

        public async Task<DataTable> GetTrialsDataAsync(TrialRequestArgs args)
        {
            return await ((TrialRepository) Repository).GetTrialsDataAsync(args);
        }

        public async Task<DataTable> GetTrialsDataV2Async(TrialRequestArgs args)
        {
            return await ((TrialRepository) Repository).GetTrialsDataV2Async(args);
        }
    }
}
