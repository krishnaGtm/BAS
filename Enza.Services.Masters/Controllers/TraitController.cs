using System.Threading.Tasks;
using System.Web.Http;
using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.Entities.BDTOs.Args;
using Enza.Masters.Entities.Constants;
using Enza.Services.Core.Abstracts;

namespace Enza.Services.Masters.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing trait details to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_MASTERS)]
    public class TraitController : ApiControllerBase
    {
        private readonly IBALTrait balTrait;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balTrait"></param>
        public TraitController(IBALTrait balTrait)
        {
            this.balTrait = balTrait;
        }

        /// <summary>
        /// Gets list of traits and their details
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("Trait")]
        public async Task<IHttpActionResult> Get([FromUri] TraitRequestArgs args)
        {
            var traits = await balTrait.GetAllAsync(args);
            return JsonResult(traits);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balTrait?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
