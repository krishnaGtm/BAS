using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Lots.Entities;
using Enza.Lots.Entities.BDTOs.Args;

namespace Enza.Lots.BusinessAccess.Interfaces
{
    public interface IBALLot : IBusinessAccess<Lot>
    {
        Task<DataTable> GetLotsDataAsync(LotRequestArgs args);
        Task<DataTable> GetLotsDataV2Async(LotRequestArgs args);
    }
}
