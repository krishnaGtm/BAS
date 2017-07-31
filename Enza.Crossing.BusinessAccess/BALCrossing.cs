using Enza.Crossing.DataAccess;
using Enza.Crossing.Entities.BDTOs.Args;
using System.Threading.Tasks;
using System.Data;
using Enza.Crossing.BusinessAccess.Interfaces;
using Enza.Crossing.DataAccess.Interfaces;
using Enza.BusinessAccess.Core.Abstracts;

namespace Enza.Crossing.BusinessAccess
{
    public class BALCrossing : BusinessAccess<Entities.Crossing>, IBALCrossing
    {
        public BALCrossing(ICrossingRepository repository) : base(repository)
        {

        }

        public async Task<DataSet> CreateCrossing(CreateCrossingRequestArgs args)
        {
            return await ((CrossingRepository)Repository).CreateCrossing(args);
           
        }

        public async Task<DataTable> GetCrossingDataAsync(CrossingRequestArgs args)
        {
            return await((CrossingRepository)Repository).GetCrossingDataAsync(args);
        }

        public async Task<DataTable> GetHierarchyAsync(int EZID)
        {
            return await ((CrossingRepository)Repository).GetHierarchyAsync(EZID);
        }

        public async Task<DataTable> GetCrossingDataV2Async(CrossingRequestArgs args)
        {
            return await ((CrossingRepository)Repository).GetCrossingDataV2Async(args);
        }
    }
}
