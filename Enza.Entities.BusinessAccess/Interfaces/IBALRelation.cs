using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Entities.BusinessAccess.Interfaces
{
    public interface IBALRelation : IBusinessAccess<Relationship>
    {
        Task<IEnumerable<Entity>> GetChildrenAsync(RelationRequestArgs args);
        Task<DataTable> GetChildrenCountAsync(RelationRequestArgs args);
    }
}
