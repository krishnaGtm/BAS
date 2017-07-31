using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Crossing.Entities.Constants;
using Enza.Crossing.Entities.BDTOs.Args;
using System;
using Enza.Common.Exceptions;
using Enza.Crossing.BusinessAccess.Interfaces;

namespace Enza.Services.Crossing.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix(RouteConstants.API_CROSSING)]
    public class CrossingMainV2Controller : ApiControllerBase
    {
        private readonly IBALCrossing balCrossing;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balCrossing"></param>
        public CrossingMainV2Controller(IBALCrossing balCrossing)
        {
            this.balCrossing = balCrossing;
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("CrossingMain")]
        public async Task<IHttpActionResult> Post([FromBody] CrossingMainRequestArgs args)
        {
            var data = await balCrossing.GetCrossingDataV2Async(args);
            return JsonResult(data);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balCrossing?.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
