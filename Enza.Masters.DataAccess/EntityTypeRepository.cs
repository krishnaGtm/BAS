using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.Common.Args.Abstract;
using Enza.Common.Extensions;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;

namespace Enza.Masters.DataAccess
{
    public class EntityTypeRepository : Repository<EntityType>, IEntityTypeRepository
    {
        public EntityTypeRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }

        public override async Task<IEnumerable<EntityType>> GetAllAsync(RequestArgs args)
        {
            var request = (EntityTypeRequestArgs) args;
            var query = @"SELECT EntityTypeCode, EntityTypeName, TableName 
                        FROM EntityType 
                        WHERE ISNULL(@EntityTypeCode, '') = '' OR EntityTypeCode = @EntityTypeCode";
            return await DbContext.ExecuteReaderAsync(query, System.Data.CommandType.Text, parameters =>
            {
                parameters.Add("@EntityTypeCode", request.EntityTypeCode);
            }, reader => new EntityType
            {
                EntityTypeCode = reader.Get<string>(0),
                EntityTypeName = reader.Get<string>(1),
                TableName = reader.Get<string>(2)
            });
        }
    }
}
