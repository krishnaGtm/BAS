using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Entities.DataAccess;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;
using System.Data;
using Enza.Entities.BusinessAccess.Interfaces;
using Enza.Entities.DataAccess.Interfaces;

namespace Enza.Entities.BusinessAccess
{
    public class BALRelation : BusinessAccess<Relationship>, IBALRelation
    {
        public BALRelation(IRelationRepository repository) : base(repository)
        {
        }

        public async Task<IEnumerable<Entity>> GetChildrenAsync(RelationRequestArgs args)
        {
            return await ((RelationRepository) Repository).GetChildrenAsync(args);
        }

        public async Task<DataTable> GetChildrenCountAsync(RelationRequestArgs args)
        {
            return await ((RelationRepository) Repository).GetChildrenCountAsync(args);
        }
    }
}
