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
    /// Description:    Responsible for providing Countries list.
    /// </summary>
    [RoutePrefix(RouteConstants.API_MASTERS)]
    public class CountryController : ApiControllerBase
    {
        private readonly IBALCountry balCountry;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balCountry"></param>
        public CountryController(IBALCountry balCountry)
        {
            this.balCountry = balCountry;
        }

        /// <summary>
        /// Gets list of traits and their details
        /// </summary>
        /// <returns></returns>
        [Route("Countries")]
        [HttpGet]
        public async Task<IHttpActionResult> GetCountries()
        {
            var countries = await balCountry.GetAllAsync();
            return JsonResult(countries);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balCountry?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
