using System.Threading.Tasks;
using System.Web.Http;
using Enza.Entities.BusinessAccess.Interfaces;
using Enza.Entities.Entities.BDTOs.Args;
using Enza.Entities.Entities.Constants;
using Enza.Services.Core.Abstracts;

namespace Enza.Services.Entities.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing entities and its relationship details to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_ENTITIES)]
    public class RelationController : ApiControllerBase
    {
        private readonly IBALRelation balRelation;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balRelation"></param>
        public RelationController(IBALRelation balRelation)
        {
            this.balRelation = balRelation;
        }

        /// <summary>
        /// Get the list of children EZIDs of related eitity 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("Relation")]
        public async Task<IHttpActionResult> Post([FromBody] RelationRequestArgs args)
        {
            if (string.IsNullOrWhiteSpace(args.EZIDS))
            {
                var traits = await balRelation.GetChildrenAsync(args);
                return JsonResult(traits);
            }
            var chindrenCount = await balRelation.GetChildrenCountAsync(args);
            return JsonResult(chindrenCount);
        }


        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balRelation?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
