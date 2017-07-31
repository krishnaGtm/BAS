using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;

namespace Enza.Groups.DataAccess.Interfaces
{
    public interface IGroupRepository : IRepository<Group>
    {
        Task<DataSet> GetGroups(GroupRequestArgs args);
        Task<DataSet> CreateGroup(GroupRequestArgs args);
        Task<DataSet> GetLinesInGroup(GroupLineRequestArgs args);
        Task<bool> CreateLinesInGroup(GroupLineRequestArgs args);
    }
}
