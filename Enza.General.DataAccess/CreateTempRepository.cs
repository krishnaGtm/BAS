using System.Data;
using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;
using Enza.Generals.Entities;
using Enza.Generals.Entities.BDTOs.Args;
using Enza.Generals.DataAccess.Constants;
using System.Data.SqlClient;
using Enza.DataAccess.Interfaces;
using Enza.Generals.DataAccess.Interfaces;

namespace Enza.Generals.DataAccess
{
    public class CreateTempRepository : Repository<CreateTemp>, ICreateTempRepository
    {
        public CreateTempRepository(IAdminDatabase dbContext) : base(dbContext)
        {
        }

        public async Task<DataSet> GetTempDataAsync(CreateTempRequestArgs args)
        {
            var result = await DbContext.ExecuteDataSetAsync(DataConstant.SP_GENERALS_GET_TEMP, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@User", args.User);
                parameter.Add("@Module", args.Module);
                parameter.Add("@CropCode", args.CC);
                parameter.Add("@GetCount", args.GetCount);
            });
            return result;
        }

        public async Task<DataSet> CreateTempDataAsync(CreateTempRequestArgs args)
        {
            
            var dt = args.GetTempTable();
            var p1 = new SqlParameter("@TVPTempData", dt)
            {
                TypeName = "TVP_CreateTempData"
            };
            var result = await DbContext.ExecuteDataSetAsync(DataConstant.SP_GENERALS_CREATE_TEMP, CommandType.StoredProcedure, parameter =>
            {
                parameter.Add("@TVPTempData", p1);
                parameter.Add("@CropCode", args.CC);
                parameter.Add("@Module", args.Module);
                parameter.Add("@User", args.User);
                parameter.Add("@GetCount", args.GetCount);

            }) ;
            return result;
        }
    }
}
