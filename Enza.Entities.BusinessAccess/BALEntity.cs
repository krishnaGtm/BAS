using Enza.BusinessAccess.Core.Abstracts;
using Enza.Entities.BusinessAccess.Interfaces;
using Enza.Entities.DataAccess.Interfaces;
using Enza.Entities.Entities;

namespace Enza.Entities.BusinessAccess
{
    public class BALEntity : BusinessAccess<Entity>, IBALEntity
    {
        public BALEntity(IEntityRepository repository) : base(repository)
        {
        }
    }
}
