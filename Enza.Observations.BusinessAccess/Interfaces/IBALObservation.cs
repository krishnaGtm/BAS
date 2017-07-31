using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Observations.Entities;
using Enza.Observations.Entities.BDTOs.Args;

namespace Enza.Observations.BusinessAccess.Interfaces
{
    public interface IBALObservation : IBusinessAccess<Observation>
    {
        Task<DataSet> GetObservationDataAsync(ObservationRequestArgs args);
        Task<DataTable> GetObservationDataV2Async(ObservationRequestArgs args);
        Task<DataSet> GetObservationFieldSetDataAsync(ObservationRequestArgs args);
        Task<DataTable> GetTraitAndPropertyObservationDataAsync(ObservationRequestArgs args);
    }
}
