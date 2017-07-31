using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Entities.Entities.Constants;
using Enza.Entities.BusinessAccess.Interfaces;
using Enza.Entities.Entities.BDTOs.Args;

namespace Enza.Services.Entities.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing trait details to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_ENTITIES)]
    public class GenerateEZIDController : ApiControllerBase
    {
        private readonly IBALGenerateEZID balGenerateEZID;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balGenerateEZID"></param>
        public GenerateEZIDController(IBALGenerateEZID balGenerateEZID)
        {
            this.balGenerateEZID = balGenerateEZID;
        }

        /// <summary>
        /// Generates number of specified new Enza IDs for specified entity type.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("GenerateEZIDs")]
        public async Task<IHttpActionResult> Post([FromBody] GenerateEZIDRequestArgs args)
        {
            var result = await balGenerateEZID.CreateEZIDsAsync(args);
            return JsonResult(result);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balGenerateEZID?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
