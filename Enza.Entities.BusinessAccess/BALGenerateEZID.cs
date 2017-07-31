using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using System.Collections.Generic;
using Enza.Entities.BusinessAccess.Interfaces;
using Enza.Entities.Entities;
using Enza.Entities.DataAccess;
using Enza.Entities.DataAccess.Interfaces;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Entities.BusinessAccess
{
    public class BALGenerateEZID : BusinessAccess<GenerateEZID>, IBALGenerateEZID
    {
        public BALGenerateEZID(IGenerateEZIDRepository repository) : base(repository)
        {
        }

        public async Task<List<int>> CreateEZIDsAsync(GenerateEZIDRequestArgs args)
        {
            return await ((GenerateEZIDRepository) Repository).CreateEZIDsAsync(args);
        }
    }
}
