using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.Masters.DataAccess.Constants;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;
using System.Data;
using Enza.DataAccess.Interfaces;
using Enza.Masters.DataAccess.Interfaces;

namespace Enza.Masters.DataAccess
{
    public class FieldSetRepository : Repository<FieldSet>, IFieldSetRepository
    {
        public FieldSetRepository(IAnalysisDatabase dbContext) : base(dbContext)
        {
        }

        public async Task<DataSet> GetFieldSetsLookupAsync(FieldSetRequestArgs args)
        {
            return await DbContext.ExecuteDataSetAsync(DataConstants.PR_GET_FIELDSETS_LOOKUP, System.Data.CommandType.StoredProcedure, parameters =>
            {
                //parameters.Add("@CropGroupID", args.CGID);
                parameters.Add("@CropCode", args.CC);
            });
        }
        public async Task<DataSet> GetAllFieldColumnsAsync(FieldSetRequestArgs args)
        {
            return await DbContext.ExecuteDataSetAsync(DataConstants.PR_GET_AllCOLUMNS_LOOKUP, System.Data.CommandType.StoredProcedure, parameters =>
            {
                //parameters.Add("@CropGroupID", args.CGID);
                parameters.Add("@CropCode", args.CC);
            });
        }
    }
}
