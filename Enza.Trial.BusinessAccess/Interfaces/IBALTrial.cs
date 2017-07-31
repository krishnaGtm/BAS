using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;

namespace Enza.Trial.BusinessAccess.Interfaces
{
    public interface IBALTrial : IBusinessAccess<Entities.Trial>
    {
        Task<DataSet> GetAllTrialAsync(CreateTrialRequestArgs args);
        Task<DataSet> CreateTrialAsync(CreateTrialRequestArgs args);
        Task<DataTable> GetTrialsDataAsync(TrialRequestArgs args);
        Task<DataTable> GetTrialsDataV2Async(TrialRequestArgs args);
    }
}
