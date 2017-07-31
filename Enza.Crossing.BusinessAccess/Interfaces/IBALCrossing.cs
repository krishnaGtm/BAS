using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Crossing.Entities.BDTOs.Args;

namespace Enza.Crossing.BusinessAccess.Interfaces
{
    public interface IBALCrossing : IBusinessAccess<Entities.Crossing>
    {
        Task<DataSet> CreateCrossing(CreateCrossingRequestArgs args);
        Task<DataTable> GetCrossingDataAsync(CrossingRequestArgs args);
        Task<DataTable> GetHierarchyAsync(int EZID);
        Task<DataTable> GetCrossingDataV2Async(CrossingRequestArgs args);
    }
}
