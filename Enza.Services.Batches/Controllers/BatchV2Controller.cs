using System.Threading.Tasks;
using System.Web.Http;
using Enza.Batches.BusinessAccess.Interfaces;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.Services.Core.Abstracts;
using Enza.Batches.Entities.Constants;

namespace Enza.Services.Batches.Controllers
{
    /// <summary>
    /// Author:         Dibya Mani Suvedi
    /// Description:    Responsible for providing batch related data to main screen.
    /// </summary>
    [RoutePrefix(RouteConstants.API_BATCHES)]
    public class BatchV2Controller : ApiControllerBase
    {
        private readonly IBALBatch balBatch;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balBatch"></param>
        public BatchV2Controller(IBALBatch balBatch)
        {
            this.balBatch = balBatch;
        }

        /// <summary>
        /// Returns batch related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("Batch")]
        public async Task<IHttpActionResult> Post([FromBody] BatchRequestArgs args)
        {
            var data = await balBatch.GetBatchesDataV2Async(args);
            return JsonResult(data);
        }
    }
}
