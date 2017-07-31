using System.Threading.Tasks;
using System.Web.Http;
using Enza.Lots.BusinessAccess.Interfaces;
using Enza.Lots.Entities.BDTOs.Args;
using Enza.Lots.Entities.Constants;
using Enza.Services.Core.Abstracts;

namespace Enza.Services.Lots.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing lots related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_LOTS)]
    public class LotController : ApiControllerBase
    {
        private readonly IBALLot balLot;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balLot"></param>
        public LotController(IBALLot balLot)
        {
            this.balLot = balLot;
        }

        /// <summary>
        /// Returns lots related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns></returns>
        [Route("lots")]
        [HttpPost]
        public async Task<IHttpActionResult> GetLots([FromBody] LotRequestArgs args)
        {
            var data = await balLot.GetLotsDataAsync(args);
            return JsonResult(data);
        }


        /// <summary>
        /// Search records of Lots
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("getlots")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchLots([FromBody] LotRequestArgs args)
        {
            var data = await balLot.GetLotsDataV2Async(args);
            return JsonResult(data);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balLot?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
