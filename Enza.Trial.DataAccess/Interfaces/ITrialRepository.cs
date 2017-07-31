using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;

namespace Enza.Trial.DataAccess.Interfaces
{
    public interface ITrialRepository : IRepository<Entities.Trial>
    {
        Task<DataSet> GetAllTrialAsync(CreateTrialRequestArgs args);
        Task<DataSet> CreateTrialAsync(CreateTrialRequestArgs args);
        Task<DataTable> GetTrialsDataAsync(TrialRequestArgs args);
        Task<DataTable> GetTrialsDataV2Async(TrialRequestArgs args);
    }
}
