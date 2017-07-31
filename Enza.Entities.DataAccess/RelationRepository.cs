using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.Common.Extensions;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Interfaces;
using Enza.Entities.DataAccess.Constants;
using Enza.Entities.DataAccess.Interfaces;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Entities.DataAccess
{
    public class RelationRepository : Repository<Relationship>, IRelationRepository
    {
        public RelationRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }

        public async Task<IEnumerable<Entity>> GetChildrenAsync(RelationRequestArgs args)
        {
            return await DbContext.ExecuteReaderAsync(DataConstants.SP_GET_CHILD_ENTITIES,
                CommandType.StoredProcedure,
                parameter =>
                {
                    parameter.Add("@EZID", args.EZID);
                    parameter.Add("@ETC", args.ETC);
                }, reader => new Entity
                {
                    EZID = reader.Get<int>(0),
                    EntityTypeCode = reader.Get<string>(1)
                });
        }

        public async Task<DataTable> GetChildrenCountAsync(RelationRequestArgs args)
        {
            var ds = await DbContext.ExecuteDataSetAsync(DataConstants.SP_ENTITIES_GETCHILDROWSCOUNT,
                CommandType.StoredProcedure, parameter => parameter.Add("@EZIDS", args.EZIDS));
            return ds.Tables[0];

        }
    }
}
