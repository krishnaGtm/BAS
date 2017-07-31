using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Generals.Entities;
using Enza.Generals.Entities.BDTOs.Args;

namespace Enza.Generals.DataAccess.Interfaces
{
    public interface ICreateTempRepository : IRepository<CreateTemp>
    {
        Task<DataSet> GetTempDataAsync(CreateTempRequestArgs args);
        Task<DataSet> CreateTempDataAsync(CreateTempRequestArgs args);
    }
}
