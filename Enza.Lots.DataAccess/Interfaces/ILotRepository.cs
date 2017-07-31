using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Lots.Entities;
using Enza.Lots.Entities.BDTOs.Args;

namespace Enza.Lots.DataAccess.Interfaces
{
    public interface ILotRepository : IRepository<Lot>
    {
        Task<DataTable> GetLotsDataAsync(LotRequestArgs args);
        Task<DataTable> GetLotsDataV2Async(LotRequestArgs args);
    }
}
