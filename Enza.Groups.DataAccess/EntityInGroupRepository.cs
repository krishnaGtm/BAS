using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.Groups.Entities;
using Enza.Groups.Entities.BDTOs.Args;
using Enza.Groups.DataAccess.Constants;
using System.Data.SqlClient;
using Enza.DataAccess.Interfaces;
using Enza.Groups.DataAccess.Interfaces;

namespace Enza.Groups.DataAccess
{
    public class EntityInGroupRepository : Repository<EntityInGroup>,IEntityInGroupRepository
    {
        public EntityInGroupRepository(IAdminDatabase dbContext) : base(dbContext)
        {
        }
        public async Task<DataSet> GetLinesInGroup(GroupLineRequestArgs args)
        {
            var data = await DbContext.ExecuteDataSetAsync(DataConstant.SP_GROUP_GET_GROUP_LINES, CommandType.StoredProcedure, Parameter =>
             {
                 Parameter.Add("@EZID", args.EZID);
             });
            return data;

        }
        public async Task<bool> CreateLinesInGroup(CreateGroupLineRequestArgs args)
        {
            var dt = args.GetTempTable();
            var p1 = new SqlParameter("@TVP_Create_groupline", dt)
            {
                TypeName = "TVP_Create_GroupLine"
            };
            var result = await DbContext.ExecuteNonQueryAsync(DataConstant.SP_GROUP_CREATE_GROUP_LINES, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@TVP_Create_groupline", p1);
            });
            return true;
        }

    }
}
