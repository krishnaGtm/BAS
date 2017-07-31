using System;
using System.Threading.Tasks;
using System.Web.Http;
using Enza.Plants.BusinessAccess.Interfaces;
using Enza.Plants.Entities.BDTOs.Args;
using Enza.Plants.Entities.Constants;
using Enza.Services.Core.Abstracts;
using Enza.Common.Exceptions;

namespace Enza.Services.Plants.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing plants related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_PLANTS)]
    public class PlantV2Controller : ApiControllerBase
    {
        private readonly IBALPlant balPlant;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balPlant"></param>
        public PlantV2Controller(IBALPlant balPlant)
        {
            this.balPlant = balPlant;
        }
        /// <summary>
        /// Returns plant related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("Plant")]
        public async Task<IHttpActionResult> Post([FromBody]PlantRequestArgs args)
        {
            try
            {
                var data = await balPlant.GetPlantsDataV2Async(args);
                return JsonResult(data);
            }
            catch (Exception ex)
            {
                var excep = new UELException(ex);
                this.Error(excep);
                return UIError(excep);
            }
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
