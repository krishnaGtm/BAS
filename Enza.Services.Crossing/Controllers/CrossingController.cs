using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Crossing.Entities.Constants;
using Enza.Crossing.Entities.BDTOs.Args;
using Enza.Crossing.BusinessAccess.Interfaces;

namespace Enza.Services.Crossing.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix(RouteConstants.API_CROSSING)]
    public class CrossingController : ApiControllerBase
    {
        private readonly IBALCrossing balCrossing;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balCrossing"></param>
        public CrossingController(IBALCrossing balCrossing)
        {
            this.balCrossing = balCrossing;
        }

        /// <summary>
        /// Get list of crossing records.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("crossings")]
        [HttpPost]
        public async Task<IHttpActionResult> GetCrossings([FromBody] CrossingRequestArgs args)
        {
            var data = await balCrossing.GetCrossingDataAsync(args);
            return JsonResult(data);
        }


        /// <summary>
        /// Get hierarchy data from graphs.
        /// </summary>
        /// <param name="EZID"></param>
        /// <returns></returns>
        [Route("hierarchy")]
        [HttpGet]
        public async Task<IHttpActionResult> GetHierarchy([FromUri] int EZID)
        {
            var HierarchyRes = await balCrossing.GetHierarchyAsync(EZID);
            return JsonResult(HierarchyRes);
        }

        /// <summary>
        /// Search of crossing records.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("getcrossings")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchCrossings([FromBody] CrossingRequestArgs args)
        {
            var data = await balCrossing.GetCrossingDataV2Async(args);
            return JsonResult(data);
        }

        /// <summary>
        /// Creates crossings.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("createcrossing")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateCrossing([FromBody] CreateCrossingRequestArgs args)
        {
            args.User = User.Identity.Name;
            var crossingResponse = await balCrossing.CreateCrossing(args);
            var values = new
            {
                Data = crossingResponse.Tables[0]
            };
            return JsonResult(values);
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
