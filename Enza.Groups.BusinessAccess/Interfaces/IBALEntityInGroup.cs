using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;

namespace Enza.Groups.BusinessAccess.Interfaces
{
    public interface IBALEntityInGroup : IBusinessAccess<EntityInGroup>
    {
        Task<DataSet> GetLinesInGroup(GroupLineRequestArgs args);
        Task<bool> CreateLinesInGroup(CreateGroupLineRequestArgs args);
    }
}
