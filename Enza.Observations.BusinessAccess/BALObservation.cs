using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Observations.BusinessAccess.Interfaces;
using Enza.Observations.DataAccess;
using Enza.Observations.DataAccess.Interfaces;
using Enza.Observations.Entities;
using Enza.Observations.Entities.BDTOs.Args;

namespace Enza.Observations.BusinessAccess
{
    public class BALObservation : BusinessAccess<Observation>, IBALObservation
    {
        public BALObservation(IObservationRepository repository) : base(repository)
        {
        }

        public async Task<DataSet> GetObservationDataAsync(ObservationRequestArgs args)
        {
            return await ((ObservationRepository) Repository).GetObservationDataAsync(args);
        }

        public async Task<DataTable> GetObservationDataV2Async(ObservationRequestArgs args)
        {
            return await ((ObservationRepository) Repository).GetObservationDataV2Async(args);
        }

        public async Task<DataSet> GetObservationFieldSetDataAsync(ObservationRequestArgs args)
        {
            return await ((ObservationRepository) Repository).GetObservationFieldSetDataAsync(args);
        }

        public async Task<DataTable> GetTraitAndPropertyObservationDataAsync(ObservationRequestArgs args)
        {
            return await ((ObservationRepository) Repository).GetTraitAndPropertyObservationDataAsync(args);
        }
    }
}
