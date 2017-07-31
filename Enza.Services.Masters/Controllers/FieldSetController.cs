using System.Threading.Tasks;
using System.Web.Http;
using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.Entities.BDTOs.Args;
using Enza.Masters.Entities.Constants;
using Enza.Services.Core.Abstracts;

namespace Enza.Services.Masters.Controllers
{
    /// <summary>
    /// Responsible for providing fieldset related information
    /// </summary>
    [RoutePrefix(RouteConstants.API_MASTERS)]
    public class FieldSetController : ApiControllerBase
    {
        private readonly IBALFieldSet balFieldSet;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balFieldSet"></param>
        public FieldSetController(IBALFieldSet balFieldSet)
        {
            this.balFieldSet = balFieldSet;
        }

        /// <summary>
        /// Gets the list of fieldsets and its columns information
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("FieldSet")]
        public async Task<IHttpActionResult> Get([FromUri] FieldSetRequestArgs args)
        {
            if (args.AllCols)
            {
                var getallColumns = await balFieldSet.GetAllFieldColumnsAsync(args);
                var values = getallColumns.Tables[0];
                return JsonResult(values);
            }
            else
            {
                var fieldSets = await balFieldSet.GetFieldSetsLookupAsync(args);
                var values = fieldSets.Tables[0];
                return JsonResult(values);
            }
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balFieldSet?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
