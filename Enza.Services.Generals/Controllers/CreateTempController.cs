using System.Threading.Tasks;
using System.Web.Http;
using Enza.Generals.BusinessAccess.Interfaces;
using Enza.Generals.Entities.BDTOs.Args;
using Enza.Generals.Entities.Constants;
using Enza.Services.Core.Abstracts;

namespace Enza.Services.Generals.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix(RouteConstants.API_GENERALS)]
    public class CreateTempController : ApiControllerBase
    {
        private readonly IBALCreateTemp balCreateTemp;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="balCreateTemp"></param>
        public CreateTempController(IBALCreateTemp balCreateTemp)
        {
            this.balCreateTemp = balCreateTemp;
        }

        /// <summary>
        /// Get list of temporary records created from Main screen.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("CreateTemp")]
        public async Task<IHttpActionResult> Get([FromUri] CreateTempRequestArgs args)
        {
            args.User = User.Identity.Name;
            var getAllCreatedRec = await balCreateTemp.GetTempDataAsync(args);
            var values = new
            {
                Data = getAllCreatedRec.Tables[0]
            };
            return JsonResult(values);
        }

        /// <summary>
        /// Creates the temporary records from main screen. It will be used to create batch, crossings, trials etc.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("CreateTemp")]
        public async Task<IHttpActionResult> Post([FromBody] CreateTempRequestArgs args)
        {
            args.User = User.Identity.Name;
            var createTrial = await balCreateTemp.CreateTempDataAsync(args);
            var values = new
            {
                Data = createTrial.Tables[0]
            };
            return JsonResult(values);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balCreateTemp?.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
