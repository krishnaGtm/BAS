using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Masters.DataAccess;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;
using System.Data;
using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;

namespace Enza.Masters.BusinessAccess
{
    public class BALFieldSet : BusinessAccess<FieldSet>, IBALFieldSet
    {
        public BALFieldSet(IFieldSetRepository repository) : base(repository)
        {
        }
        public async Task<DataSet> GetFieldSetsLookupAsync(FieldSetRequestArgs args)
        {
            return await ((FieldSetRepository) Repository).GetFieldSetsLookupAsync(args);
        }
        public async Task<DataSet> GetAllFieldColumnsAsync(FieldSetRequestArgs args)
        {
            return await ((FieldSetRepository)Repository).GetAllFieldColumnsAsync(args);
        }
    }
}
