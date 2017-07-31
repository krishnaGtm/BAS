using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;

namespace Enza.Masters.BusinessAccess.Interfaces
{
    public interface IBALFieldSet : IBusinessAccess<FieldSet>
    {
        Task<DataSet> GetFieldSetsLookupAsync(FieldSetRequestArgs args);
        Task<DataSet> GetAllFieldColumnsAsync(FieldSetRequestArgs args);
    }
}
