using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using System.Collections.Generic;
using Enza.Common.Extensions;
using System.Linq;
using Enza.DataAccess.Interfaces;
using Enza.Entities.Entities.BDTOs.Args;
using Enza.Entities.Entities;
using Enza.Entities.DataAccess.Constants;
using Enza.Entities.DataAccess.Interfaces;

namespace Enza.Entities.DataAccess
{
    public class GenerateEZIDRepository : Repository<GenerateEZID>, IGenerateEZIDRepository
    {
        public GenerateEZIDRepository(IAdminDatabase dbContext) : base(dbContext)
        {
        }

        public async Task<List<int>> CreateEZIDsAsync(GenerateEZIDRequestArgs args)
        {
            var result =
                await
                    DbContext.ExecuteReaderAsync(DataConstants.SP_ENTITIES_CREATEEZIDS,
                        System.Data.CommandType.StoredProcedure,
                        parameters =>
                        {
                            parameters.Add("@TotalEZID", args.TotalEZID);
                            parameters.Add("@EntityTypeCode", args.ETC);

                        }, reader => reader.Get<int>(0));
            return result.ToList();
        }
    }
}
