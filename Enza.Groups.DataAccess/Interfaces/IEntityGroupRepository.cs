using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;

namespace Enza.Groups.DataAccess.Interfaces
{
    public interface IEntityGroupRepository : IRepository<EntityGroup>
    {
        Task<DataSet> GetGroups(GroupRequestArgs args);
        Task<IEnumerable<int>> CreateGroups(IEnumerable<EntityGroup> args);
    }
}
