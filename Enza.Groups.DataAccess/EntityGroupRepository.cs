using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Enza.Common.Extensions;
using Enza.DataAccess.Abstracts;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;
using Enza.Groups.DataAccess.Constants;
using Enza.DataAccess.Interfaces;
using Enza.Groups.DataAccess.Interfaces;

namespace Enza.Groups.DataAccess
{
    public class EntityGroupRepository : Repository<EntityGroup>, IEntityGroupRepository
    {
        public EntityGroupRepository(IAdminDatabase dbContext) : base(dbContext)
        {

        }

        public async Task<DataSet> GetGroups(GroupRequestArgs args)
        {
            var result =
                await
                    DbContext.ExecuteDataSetAsync(DataConstant.SP_GROUP_GET_GROUPS, CommandType.StoredProcedure,
                        parameter =>
                        {
                            parameter.Add("@User", args.User);
                        });
            return result;
        }

        public async Task<IEnumerable<int>> CreateGroups(IEnumerable<EntityGroup> args)
        {
            var groupsAsJson = args.ToJson();
            var result =
                await DbContext.ExecuteReaderAsync(DataConstant.SP_GROUP_CREATE_GROUP, CommandType.StoredProcedure,
                    parameter => parameter.Add("@GroupsAsJson", groupsAsJson), reader => reader.Get<int>(0));
            return result.ToList();
        }
    }
}
