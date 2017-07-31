using System;
using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Trial.BusinessAccess.Interfaces;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Trial.Entities.Constants;
using Enza.Common.Exceptions;

namespace Enza.Services.Trial.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing Trials related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_TRIAL)]
    public class TrialMainV2Controller : ApiControllerBase
    {
        private readonly IBALTrial balTrial;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balTrial"></param>
        public TrialMainV2Controller(IBALTrial balTrial)
        {
            this.balTrial = balTrial;
        }

        /// <summary>
        /// Returns trials related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">
        /// {
        ///   "PFSID": 0, //Property FieldSet ID
        ///   "ETC": "string", // Entity Type Code
        ///   "EZIDS": "string", //Comma separated list of EZID
        ///   "PCOLS": "string", //Comma separated list of TraitID which belongs to Property Trait
        ///   "PS": 0, // PageSize for pagination
        ///   "PN": 0, // Current Page Number
        ///   "SC": "string", //Default Sort Column
        ///   "SO": "string", //Default Sort Order
        ///   "Total": 0, // Output parameter, returns total number of rows returned by the query
        ///   "F": [ //Filters
        ///     {
        ///       "Fn": "string", //Field name which is to be filtered i.e. EZID
        ///       "Ft": "string", //Type of value i.e. ST, DT, INT etc.
        ///       "Fv": "string", //Value for filtering
        ///       "Ex": "string", //Expression i.e. equal, contains, startswith, gt, lt, gte, lte etc.
        ///       "Op": "string" //Operator, null for single condition. if multiple, operator should be same for multiple conditions withing a same field
        ///     }
        ///   ],
        ///   "S": [ // Sorging
        ///     {
        ///       "SC": "string", // Sort Column
        ///       "SO": "string" // Sort Order
        ///     }
        ///   ]
        /// }
        /// </param>
        /// <returns>Returns DataTable if execution is successful otherwise error message is thrown.</returns>
        [Route("TrialMain")]
        public async Task<IHttpActionResult> Post([FromBody] TrialRequestArgs args)
        {
            var data = await balTrial.GetTrialsDataV2Async(args);
            return JsonResult(data);
        }

        /// <inheritdoc />
        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                balTrial?.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
