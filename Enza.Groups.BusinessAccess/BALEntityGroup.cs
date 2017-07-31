using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Abstracts;
using Enza.Groups.DataAccess;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;
using System.Data;
using System.Linq;
using Enza.Groups.BusinessAccess.Interfaces;
using Enza.Groups.DataAccess.Interfaces;

namespace Enza.Groups.BusinessAccess
{
    public class BALEntityGroup : BusinessAccess<EntityGroup>, IBALEntityGroup
    {
        private EntityInGroupRepository groupLineRepository;

        public BALEntityGroup(IEntityGroupRepository repository, EntityInGroupRepository groupLineRepository)
            : base(repository)
        {
            this.groupLineRepository = groupLineRepository;
        }

        public async Task<DataSet> GetGroups(GroupRequestArgs args)
        {
            return await ((EntityGroupRepository)Repository).GetGroups(args);
        }
        public async Task<IEnumerable<int>> CreateGroups(IEnumerable<EntityGroup> args)
        {
            return await ((EntityGroupRepository)Repository).CreateGroups(args);
        }

        public async Task<IEnumerable<int>> CreateGroupsWithLines(IEnumerable<CreateGroupRequestArgs> args)
        {
            var groupsWithLines = args.ToList();
            var groupArgs = groupsWithLines.Select(o => new EntityGroup
            {
                EZID = o.EZID,
                GroupName = o.GroupName,
                Remark = o.Remark,
                UserIdCreated = o.User
            });
            var groups = (await CreateGroups(groupArgs)).ToList();
            if (groups.Count != groupsWithLines.Count)
            {
                throw new Exception("Couldn't create groups for all selected records.");
            }
            var groupLines = groupsWithLines.SelectMany(o => o.GroupLines, (g, l) => new TvpGroupInLine
            {
                GroupEZID = g.EZID,
                ETC = l.ETC,
                Name = l.Name,
                EZID = l.EZID
            }).ToList();
            var groupLinesArgs = new CreateGroupLineRequestArgs
            {
                GroupLineData = groupLines
            };
            //create group lines
            await groupLineRepository.CreateLinesInGroup(groupLinesArgs);

            return groups;
        }
    }
}
