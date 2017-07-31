using System;
using System.Threading.Tasks;
using System.Web.Http;
using Enza.Gateway.Entities.BDTOs.Args;
using Enza.Gateway.Entities.Constants;
using Enza.Services.Core.Abstracts;
using Enza.Services.Gateway.Models;

namespace Enza.Services.Gateway.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for calliing different micro services and aggregating data and provide final result to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_GATEWAY)]
    public class ObservationController : ApiControllerBase
    {
        /// <summary>
        /// Provides data to main screen based on the applied filters, sorting and paging. It will get data from different micro services and provide client a final data.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("observations")]
        [HttpPost]
        public async Task<IHttpActionResult> GetObservations([FromBody] GatewayRequestArgs args)
        {
            var model = new ObservationModel();
            var result = await model.GetObservationDataAsync(args);
            result.Add("ERRORS", string.Empty);
            if (model.Errors.Count > 0)
            {
                result["ERRORS"] = string.Join(Environment.NewLine, model.Errors.ToArray());
            }
            return JsonResult(result);
        }

        /// <summary>
        /// Search entities and its observations. This function is used in Main screen.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("getobservations")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchObservations([FromBody] GatewayRequestArgs args)
        {
            var model = new ObservationModel();
            var result = await model.GetObservationDataV2Async(args);
            if (model.Errors.Count > 0)
            {
                result["ERRORS"] = string.Join(Environment.NewLine, model.Errors.ToArray());
            }
            return JsonResult(result);
        }
    }
}
