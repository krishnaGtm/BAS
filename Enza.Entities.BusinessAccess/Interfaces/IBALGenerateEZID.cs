using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Entities.BusinessAccess.Interfaces
{
    public interface IBALGenerateEZID : IBusinessAccess<GenerateEZID>
    {
        Task<List<int>> CreateEZIDsAsync(GenerateEZIDRequestArgs args);
    }
}
