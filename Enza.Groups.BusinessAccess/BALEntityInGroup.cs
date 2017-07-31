using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Groups.DataAccess;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;
using System.Data;
using Enza.Groups.BusinessAccess.Interfaces;
using Enza.Groups.DataAccess.Interfaces;

namespace Enza.Groups.BusinessAccess
{
    public class BALEntityInGroup : BusinessAccess<EntityInGroup>, IBALEntityInGroup
    {
        public BALEntityInGroup(IEntityInGroupRepository repository) : base(repository)
        {
        }        
        public async Task<bool> CreateLinesInGroup(CreateGroupLineRequestArgs args)
        {
            return await ((EntityInGroupRepository)Repository).CreateLinesInGroup(args);

        }
        public async Task<DataSet> GetLinesInGroup(GroupLineRequestArgs args)
        {
            return await ((EntityInGroupRepository)Repository).GetLinesInGroup(args);

        }
    }
}
