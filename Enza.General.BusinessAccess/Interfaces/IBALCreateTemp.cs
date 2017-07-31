using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Generals.Entities;
using Enza.Generals.Entities.BDTOs.Args;

namespace Enza.Generals.BusinessAccess.Interfaces
{
    public interface IBALCreateTemp : IBusinessAccess<CreateTemp>
    {
        Task<DataSet> GetTempDataAsync(CreateTempRequestArgs args);
        Task<DataSet> CreateTempDataAsync(CreateTempRequestArgs args);
    }
}
