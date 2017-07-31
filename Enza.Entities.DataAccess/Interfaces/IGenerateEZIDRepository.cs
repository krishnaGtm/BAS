using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Entities.DataAccess.Interfaces
{
    public interface IGenerateEZIDRepository : IRepository<GenerateEZID>
    {
        Task<List<int>> CreateEZIDsAsync(GenerateEZIDRequestArgs args);
    }
}
