using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Observations.BusinessAccess.Interfaces;
using Enza.Observations.Entities.BDTOs.Args;
using Enza.Observations.Entities.Constants;

namespace Enza.Services.Observations.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing trait fieldset and observations related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_OBSERVATIONS)]
    public class ObservationV2Controller : ApiControllerBase
    {
        private readonly IBALObservation balObservation;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balObservation"></param>
        public ObservationV2Controller(IBALObservation balObservation)
        {
            this.balObservation = balObservation;
        }

        /// <summary>
        /// Returns trait and observations related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("Observation")]
        public async Task<IHttpActionResult> Post([FromBody] ObservationRequestArgs args)
        {
            var data = await balObservation.GetObservationDataV2Async(args);
            return JsonResult(data);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balObservation?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
