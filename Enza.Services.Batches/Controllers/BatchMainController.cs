using System.Threading.Tasks;
using System.Web.Http;
using Enza.Batches.BusinessAccess.Interfaces;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.Services.Core.Abstracts;
using Enza.Batches.Entities.Constants;

namespace Enza.Services.Batches.Controllers
{
    /// <summary>
    /// Author:         Krishna Gautam
    /// Description:    Responsible for Creating BATCH based on LOT.
    /// </summary>
    [RoutePrefix(RouteConstants.API_BATCHES)]
    public class BatchMainController : ApiControllerBase
    {
        private readonly IBALBatch balBatch;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balBatch"></param>
        public BatchMainController(IBALBatch balBatch)
        {
            this.balBatch = balBatch;
        }

        /// <summary>
        /// Returns batch related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns DataTable if execution is successful, other wise Success=false and Message=Error message thrown.</returns>
        [Route("BatchMain")]
        public async Task<IHttpActionResult> Post([FromBody] BatchMainRequestArgs args)
        {
            var data = await balBatch.CreateBatchAsync(args);
            return JsonResult(data);
        }
    }
}
