using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Interfaces;
using Enza.Entities.DataAccess.Interfaces;
using Enza.Entities.Entities;

namespace Enza.Entities.DataAccess
{
    public class EntityRepository : Repository<Entity>, IEntityRepository
    {
        public EntityRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }
    }
}
