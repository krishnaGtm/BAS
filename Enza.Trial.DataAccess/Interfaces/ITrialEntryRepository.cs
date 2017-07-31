using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;

namespace Enza.Trial.DataAccess.Interfaces
{
    public interface ITrialEntryRepository : IRepository<Entities.Trial>
    {
        Task<DataSet> CreateTrialEntryAsync(TrialEntryRequestArgs args);
        Task<DataSet> GetTrialEntryByTrialAsync(TrialEntryRequestArgs args);
    }
}
