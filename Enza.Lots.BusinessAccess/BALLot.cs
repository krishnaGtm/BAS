using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Lots.BusinessAccess.Interfaces;
using Enza.Lots.DataAccess;
using Enza.Lots.DataAccess.Interfaces;
using Enza.Lots.Entities;
using Enza.Lots.Entities.BDTOs.Args;

namespace Enza.Lots.BusinessAccess
{
    public class BALLot : BusinessAccess<Lot>, IBALLot
    {
        public BALLot(ILotRepository repository) : base(repository)
        {
        }

        public async Task<DataTable> GetLotsDataAsync(LotRequestArgs args)
        {
            return await ((LotRepository) Repository).GetLotsDataAsync(args);
        }

        public async Task<DataTable> GetLotsDataV2Async(LotRequestArgs args)
        {
            return await ((LotRepository) Repository).GetLotsDataV2Async(args);
        }
    }
}
