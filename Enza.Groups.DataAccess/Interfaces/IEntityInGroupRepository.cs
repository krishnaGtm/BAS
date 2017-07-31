using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;

namespace Enza.Groups.DataAccess.Interfaces
{
    public interface IEntityInGroupRepository : IRepository<EntityInGroup>
    {
        Task<DataSet> GetLinesInGroup(GroupLineRequestArgs args);
        Task<bool> CreateLinesInGroup(CreateGroupLineRequestArgs args);
    }
}
