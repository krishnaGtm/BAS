using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Observations.Entities;
using Enza.Observations.Entities.BDTOs.Args;

namespace Enza.Observations.DataAccess.Interfaces
{
    public interface IObservationRepository : IRepository<Observation>
    {
        Task<DataSet> GetObservationDataAsync(ObservationRequestArgs args);
        Task<DataTable> GetObservationDataV2Async(ObservationRequestArgs args);
        Task<DataTable> GetTraitAndPropertyObservationDataAsync(ObservationRequestArgs args);
        Task<DataSet> GetObservationFieldSetDataAsync(ObservationRequestArgs args);
    }
}
