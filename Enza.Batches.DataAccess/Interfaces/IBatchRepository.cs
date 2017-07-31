using System.Data;
using System.Threading.Tasks;
using Enza.Batches.Entities;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.DataAccess.Interfaces;

namespace Enza.Batches.DataAccess.Interfaces
{
    public interface IBatchRepository : IRepository<Batch>
    {
        Task<DataTable> GetBatchesDataAsync(BatchRequestArgs args);
        Task<DataTable> GetBatchesDataV2Async(BatchRequestArgs args);
        Task<string> CreateBatchAsync(CreateBatchRequestArgs args);
    }
}
