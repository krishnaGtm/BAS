using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Trial.Entities.Constants;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Services.Trial.Models;
using Enza.Trial.BusinessAccess.Interfaces;

namespace Enza.Services.Trial.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix(RouteConstants.API_TRIAL)]
    public class TrialEntryController : ApiControllerBase
    {
        private readonly IBALTrialEntry balTrialEntry;
        private readonly TrialModels trialModels;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balTrialEntry"></param>
        public TrialEntryController(IBALTrialEntry balTrialEntry)
        {
            this.balTrialEntry = balTrialEntry;
            trialModels = new TrialModels();
        }

        /// <summary>
        /// Gets the list trial entries based on ezid and crop code
        /// </summary>
        /// <param name="cc">Crop Code</param>
        /// <param name="ezid">EZID</param>
        /// <returns></returns>
        [Route("trialentries")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTrialEntries(string cc, int ezid)
        {
            //args.User = User.Identity.Name;
            var GetTrialEntry = await balTrialEntry.GetTrialEntryByTrialAsync(new TrialEntryRequestArgs
            {
                CC = cc,
                EZID = ezid,
                User = User.Identity.Name
            });
            var Columns = trialModels.GetTrialEntryColumns();
            var values = new
            {
                Data = GetTrialEntry.Tables[0],
                TrialDetail = GetTrialEntry.Tables[1],
                InitialFields = Columns
            };
            return JsonResult(values);
        }

        /// <summary>
        /// Creates new trials entries for particular trial.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("createtrialentry")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateTrialEntry([FromBody] TrialEntryRequestArgs args)
        {
            args.User = User.Identity.Name;
            var CreateTrialEntry = await balTrialEntry.CreateTrialEntryAsync(args);
            var Columns = trialModels.GetTrialEntryColumns();
            var values = new
            {
                Data = CreateTrialEntry.Tables[0],
                TrialDetail = CreateTrialEntry.Tables[1],
                InitialFields = Columns
            };
            return JsonResult(values);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balTrialEntry?.Dispose();
            }
            base.Dispose(disposing);
        }

    }
}
