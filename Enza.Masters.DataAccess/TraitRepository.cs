using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.Masters.DataAccess.Constants;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;
using System.Data;
using Enza.Common.Args.Abstract;
using Enza.Common.Extensions;
using Enza.DataAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;

namespace Enza.Masters.DataAccess
{
    public class TraitRepository : Repository<Trait>, ITraitRepository
    {
        public TraitRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }

        public override async Task<IEnumerable<Trait>> GetAllAsync(RequestArgs args)
        {
            var request = (TraitRequestArgs) args;
            return
                await DbContext.ExecuteReaderAsync(DataConstants.PR_GET_FIELD_DETAILS, CommandType.StoredProcedure,
                    parameters =>
                    {
                        parameters.Add("@TraitFieldSetID", request.TFSID);
                        parameters.Add("@PropertyFieldSetID", request.PFSID);
                        parameters.Add("@TraitCols", request.TCOLS);
                        parameters.Add("@PropCols", request.PCOLS);
                    }, reader => new Trait
                    {
                        TraitID = reader.Get<int>(0),
                        TraitName = reader.Get<string>(1),
                        ColumnLabel = reader.Get<string>(2),
                        DataType = reader.Get<string>(3),
                        DisplayFormat = reader.Get<string>(4),
                        Editor = reader.Get<bool>(5),
                        ListOfValues = reader.Get<bool>(6),
                        MinValue = reader.Get<int?>(7),
                        MaxValue = reader.Get<int?>(8),
                        Property = reader.Get<bool>(9),
                        Updatable = reader.Get<bool>(10),
                        SortOrder = reader.Get<int>(11)
                    });
        }
    }
}
