using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Plants.Entities;
using Enza.Plants.Entities.BDTOs.Args;

namespace Enza.Plants.DataAccess.Interfaces
{
    public interface IPlantRepository : IRepository<Plant>
    {
        Task<DataTable> GetPlantsDataAsync(PlantRequestArgs args);
        Task<DataTable> GetPlantsDataV2Async(PlantRequestArgs args);
    }
}
