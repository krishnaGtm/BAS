using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;

namespace Enza.Groups.BusinessAccess.Interfaces
{
    public interface IBALEntityGroup : IBusinessAccess<EntityGroup>
    {
        Task<DataSet> GetGroups(GroupRequestArgs args);
        Task<IEnumerable<int>> CreateGroups(IEnumerable<EntityGroup> args);

        Task<IEnumerable<int>> CreateGroupsWithLines(IEnumerable<CreateGroupRequestArgs> args);
    }
}
