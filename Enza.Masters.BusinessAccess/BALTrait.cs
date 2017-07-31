using Enza.BusinessAccess.Core.Abstracts;
using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;
using Enza.Masters.Entities;

namespace Enza.Masters.BusinessAccess
{
    public class BALTrait : BusinessAccess<Trait>, IBALTrait
    {
        public BALTrait(ITraitRepository repository) : base(repository)
        {
        }
    }
}
