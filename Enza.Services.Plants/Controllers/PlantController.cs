using System.Threading.Tasks;
using System.Web.Http;
using Enza.Plants.BusinessAccess.Interfaces;
using Enza.Plants.Entities.BDTOs.Args;
using Enza.Plants.Entities.Constants;
using Enza.Services.Core.Abstracts;

namespace Enza.Services.Plants.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing plants related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_PLANTS)]
    public class PlantController : ApiControllerBase
    {
        private readonly IBALPlant balPlant;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balPlant"></param>
        public PlantController(IBALPlant balPlant)
        {
            this.balPlant = balPlant;
        }

        /// <summary>
        /// Returns plant related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("plants")]
        [HttpPost]
        public async Task<IHttpActionResult> GetPlants([FromBody] PlantRequestArgs args)
        {
            var data = await balPlant.GetPlantsDataAsync(args);
            return JsonResult(data);
        }

        /// <summary>
        /// Search records for Plants.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("getplants")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchPlants([FromBody] PlantRequestArgs args)
        {
            var data = await balPlant.GetPlantsDataV2Async(args);
            return JsonResult(data);
        }


        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balPlant?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
