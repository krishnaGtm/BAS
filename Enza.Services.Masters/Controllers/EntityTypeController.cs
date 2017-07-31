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
    /// Description:    Responsible for providing Entitype related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_MASTERS)]
    public class EntityTypeController : ApiControllerBase
    {
        private readonly IBALEntityType balEntityType;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balEntityType"></param>
        public EntityTypeController(IBALEntityType balEntityType)
        {
            this.balEntityType = balEntityType;
        }

        /// <summary>
        /// Return entity type detail based on EntityTypeCode
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("EntityType")]
        public async Task<IHttpActionResult> Get([FromUri] EntityTypeRequestArgs args)
        {
            var entityTypes = await balEntityType.GetAllAsync(args);
            return JsonResult(entityTypes);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balEntityType?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
