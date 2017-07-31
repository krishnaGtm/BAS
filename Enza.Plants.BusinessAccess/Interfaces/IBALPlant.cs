using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Plants.Entities;
using Enza.Plants.Entities.BDTOs.Args;

namespace Enza.Plants.BusinessAccess.Interfaces
{
    public interface IBALPlant : IBusinessAccess<Plant>
    {
        Task<DataTable> GetPlantsDataAsync(PlantRequestArgs args);
        Task<DataTable> GetPlantsDataV2Async(PlantRequestArgs args);
    }
}
