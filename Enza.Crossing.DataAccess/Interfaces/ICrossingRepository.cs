using System.Data;
using System.Threading.Tasks;
using Enza.Crossing.Entities.BDTOs.Args;
using Enza.DataAccess.Interfaces;

namespace Enza.Crossing.DataAccess.Interfaces
{
    public interface ICrossingRepository : IRepository<Entities.Crossing>
    {
        Task<DataSet> CreateCrossing(CreateCrossingRequestArgs args);
        Task<DataTable> GetCrossingDataAsync(CrossingRequestArgs args);
        Task<DataTable> GetCrossingDataV2Async(CrossingRequestArgs args);
        Task<DataTable> GetHierarchyAsync(int EZID);
    }
}
