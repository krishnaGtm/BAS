using System;
using System.Threading.Tasks;
using System.Web.Http;
using Enza.Lots.BusinessAccess.Interfaces;
using Enza.Lots.Entities.BDTOs.Args;
using Enza.Lots.Entities.Constants;
using Enza.Services.Core.Abstracts;
using Enza.Common.Exceptions;

namespace Enza.Services.Lots.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing lots related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_LOTS)]
    public class LotV2Controller : ApiControllerBase
    {
        private readonly IBALLot balLot;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balLot"></param>
        public LotV2Controller(IBALLot balLot)
        {
            this.balLot = balLot;
        }

        /// <summary>
        /// Returns lots related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("Lot")]
        public async Task<IHttpActionResult> Post([FromBody] LotRequestArgs args)
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
