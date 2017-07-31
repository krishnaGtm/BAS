using Enza.BusinessAccess.Core.Abstracts;
using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;
using Enza.Masters.Entities;

namespace Enza.Masters.BusinessAccess
{
    public class BALEntityType : BusinessAccess<EntityType>, IBALEntityType
    {
        public BALEntityType(IEntityTypeRepository repository) : base(repository)
        {
        }
    }
}
