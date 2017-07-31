using System.Data;
using System.Threading.Tasks;
using Enza.Batches.Entities;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.BusinessAccess.Core.Interfaces;

namespace Enza.Batches.BusinessAccess.Interfaces
{
    public interface IBALBatch : IBusinessAccess<Batch>
    {
        Task<DataTable> GetBatchesDataAsync(BatchRequestArgs args);
        Task<DataTable> GetBatchesDataV2Async(BatchRequestArgs args);
        Task<string> CreateBatchAsync(CreateBatchRequestArgs args);
    }
}
