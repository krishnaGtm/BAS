using System.Data;
using System.Threading.Tasks;
using Enza.Batches.BusinessAccess.Interfaces;
using Enza.Batches.DataAccess;
using Enza.Batches.DataAccess.Interfaces;
using Enza.Batches.Entities;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.BusinessAccess.Core.Abstracts;

namespace Enza.Batches.BusinessAccess
{
    public class BALBatch : BusinessAccess<Batch>, IBALBatch
    {
        public BALBatch(IBatchRepository repository) : base(repository)
        {

        }

        public async Task<DataTable> GetBatchesDataAsync(BatchRequestArgs args)
        {
            return await ((BatchRepository) Repository).GetBatchesDataAsync(args);
        }

        public async Task<DataTable> GetBatchesDataV2Async(BatchRequestArgs args)
        {
            return await ((BatchRepository) Repository).GetBatchesDataV2Async(args);
        }

        public async Task<string> CreateBatchAsync(CreateBatchRequestArgs args)
        {
            return await ((BatchRepository) Repository).CreateBatchAsync(args);
        }
    }
}
