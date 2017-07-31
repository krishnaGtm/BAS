using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Trial.Entities.BDTOs.Args;
using System.Data;
using Enza.Trial.BusinessAccess.Interfaces;
using Enza.Trial.DataAccess;
using Enza.Trial.DataAccess.Interfaces;

namespace Enza.Trial.BusinessAccess
{
    public class BALTrialEntry : BusinessAccess<Entities.Trial>, IBALTrialEntry
    {
        public BALTrialEntry(ITrialEntryRepository repository) : base(repository)
        {
        }

        public async Task<DataSet> CreateTrialEntryAsync(TrialEntryRequestArgs args)
        {
            return await ((TrialEntryRepository) Repository).CreateTrialEntryAsync(args);
        }

        public async Task<DataSet> GetTrialEntryByTrialAsync(TrialEntryRequestArgs args)
        {
            return await ((TrialEntryRepository) Repository).GetTrialEntryByTrialAsync(args);
        }
    }
}
