using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;

namespace Enza.Trial.BusinessAccess.Interfaces
{
    public interface IBALTrialEntry : IBusinessAccess<Entities.Trial>
    {
        Task<DataSet> CreateTrialEntryAsync(TrialEntryRequestArgs args);
        Task<DataSet> GetTrialEntryByTrialAsync(TrialEntryRequestArgs args);
    }
}
