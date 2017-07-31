using System.Collections.Generic;
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
    public class ObservationController : ApiControllerBase
    {
        private readonly IBALObservation balObservation;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balObservation"></param>
        public ObservationController(IBALObservation balObservation)
        {
            this.balObservation = balObservation;
        }

        /// <summary>
        /// Returns trait and observations related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("observations")]
        [HttpPost]
        public async Task<IHttpActionResult> GetObservations([FromBody] ObservationRequestArgs args)
        {
            var result = new Dictionary<string, object>();
            var filters = args.GetFilters();
            var sort = args.GetSorts();
            if (filters.Rows.Count > 0 || sort.Rows.Count > 0)
            {
                var observationData = await balObservation.GetTraitAndPropertyObservationDataAsync(args);
                result.Add("FinalData", observationData);
                result.Add("TotalRecords", args.Total);
                return JsonResult(result);
            }
            if(string.IsNullOrWhiteSpace(args.EZIDS))
            {
                var observationData = await balObservation.GetObservationDataAsync(args);
                if (observationData.Tables.Count == 1 &&
                    (string.IsNullOrWhiteSpace(args.TCOLS) || args.TFSID == null))
                {
                    result.Add("InitialData", observationData.Tables[0]);
                    result.Add("TotalRecords", args.Total);
                    return JsonResult(result);
                }
                if (observationData.Tables.Count == 2)
                {
                    result.Add("InitialData", observationData.Tables[0]);
                    result.Add("ObservationData", observationData.Tables[1]);
                    result.Add("TotalRecords", args.Total);
                    return JsonResult(result);
                }

            }
            else
            {
                var observationData = await balObservation.GetObservationFieldSetDataAsync(args);
                if (observationData.Tables.Count == 1)
                {
                    result.Add("ObservationData", observationData.Tables[0]);
                    return JsonResult(result);
                }
            }
            //if (string.IsNullOrWhiteSpace(args.EZIDS) || !string.IsNullOrWhiteSpace(args.PCOLS) ||
            //    args.PFSID != null)
            //{
            //    if(!string.IsNullOrWhiteSpace(args.EZIDS))
            //    {
            //        var observationData = await balObservation.GetObservationFieldSetDataAsync(args);
            //        if (observationData.Tables.Count == 1)
            //        {
            //            result.Add("ObservationData", observationData.Tables[0]);
            //            return JsonResult(result);
            //        }
            //    }
            //    else
            //    {
            //        var observationData = await balObservation.GetObservationDataAsync(args);
            //        if (observationData.Tables.Count == 1 &&
            //            (string.IsNullOrWhiteSpace(args.TCOLS) || args.TFSID == null))
            //        {
            //            result.Add("InitialData", observationData.Tables[0]);
            //            result.Add("TotalRecords", args.Total);
            //            return JsonResult(result);
            //        }
            //        if (observationData.Tables.Count == 2)
            //        {
            //            result.Add("InitialData", observationData.Tables[0]);
            //            result.Add("ObservationData", observationData.Tables[1]);
            //            result.Add("TotalRecords", args.Total);
            //            return JsonResult(result);
            //        }
            //    }
                
            //}
            //else
            //{
            //    if (args.TFSID != null || !string.IsNullOrWhiteSpace(args.TCOLS))
            //    {
            //        var observationData = await balObservation.GetObservationFieldSetDataAsync(args);
            //        if (observationData.Tables.Count == 1)
            //        {
            //            result.Add("ObservationData", observationData.Tables[0]);
            //            return JsonResult(result);
            //        }
            //    }
            //}
            return NotFound();
        }


        /// <summary>
        /// Search records of Observations.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("getobservations")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchObservations([FromBody] ObservationRequestArgs args)
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
