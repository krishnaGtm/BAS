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
    public class BatchController : ApiControllerBase
    {
        private readonly IBALBatch balBatch;

        /// <summary>
        /// 
        /// </summary>
        /// <param name="balBatch"></param>
        public BatchController(IBALBatch balBatch)
        {
            this.balBatch = balBatch;
        }


        /// <summary>
        /// Returns batch related data to main screen based on filtering, sorting and paging.
        /// </summary>
        /// <param name="args">Arguments</param>
        /// <returns>Returns data of related batches.</returns>
        [Route("batches")]
        [HttpPost]
        public async Task<IHttpActionResult> GetBatches([FromBody] BatchRequestArgs args)
        {
            var data = await balBatch.GetBatchesDataAsync(args);
            return JsonResult(data);
        }

        /// <summary>
        /// Search function of batches.
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("getbatches")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchBatches([FromBody] BatchRequestArgs args)
        {
            var data = await balBatch.GetBatchesDataV2Async(args);
            return JsonResult(data);
        }
        
        /// <summary>
        /// Creates new batch
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("createbatch")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateBatch([FromBody] CreateBatchRequestArgs args)
        {
            var data = await balBatch.CreateBatchAsync(args);
            return JsonResult(data);
        }
    }
}
