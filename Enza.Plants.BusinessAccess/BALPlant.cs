using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Plants.BusinessAccess.Interfaces;
using Enza.Plants.DataAccess;
using Enza.Plants.DataAccess.Interfaces;
using Enza.Plants.Entities;
using Enza.Plants.Entities.BDTOs.Args;

namespace Enza.Plants.BusinessAccess
{
    public class BALPlant : BusinessAccess<Plant>, IBALPlant
    {
        public BALPlant(IPlantRepository repository) : base(repository)
        {
        }

        public async Task<DataTable> GetPlantsDataAsync(PlantRequestArgs args)
        {
            return await ((PlantRepository) Repository).GetPlantsDataAsync(args);
        }

        public async Task<DataTable> GetPlantsDataV2Async(PlantRequestArgs args)
        {
            return await ((PlantRepository) Repository).GetPlantsDataV2Async(args);
        }
    }
}
