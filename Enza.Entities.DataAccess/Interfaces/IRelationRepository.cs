using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Interfaces;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Entities.DataAccess.Interfaces
{
    public interface IRelationRepository : IRepository<Relationship>
    {
        Task<IEnumerable<Entity>> GetChildrenAsync(RelationRequestArgs args);
        Task<DataTable> GetChildrenCountAsync(RelationRequestArgs args);
    }
}
