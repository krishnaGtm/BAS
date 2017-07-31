using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;

namespace Enza.Masters.DataAccess.Interfaces
{
    public interface IFieldSetRepository : IRepository<FieldSet>
    {
        Task<DataSet> GetFieldSetsLookupAsync(FieldSetRequestArgs args);
        Task<DataSet> GetAllFieldColumnsAsync(FieldSetRequestArgs args);
    }
}
