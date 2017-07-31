using System.Threading.Tasks;
using System.Web.Http;
using Enza.Services.Core.Abstracts;
using Enza.Trial.Entities.Constants;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Services.Trial.Models;
using Enza.Services.API.Discovery;
using Enza.Discovery.Entities;
using Enza.Services.API.Entities;
using Enza.Entities.Entities.BDTOs.Args;
using Enza.Trial.BusinessAccess.Interfaces;

namespace Enza.Services.Trial.Controllers
{
    /// <summary>
    /// 
    /// </summary>
    [RoutePrefix(RouteConstants.API_TRIAL)]
    public class TrialController : ApiControllerBase
    {
        private readonly IBALTrial balTrial;
        private readonly TrialModels trialModel;
        /// <summary>
        /// 
        /// </summary>
        /// <param name="balTrial"></param>
        public TrialController(IBALTrial balTrial)
        {
            this.balTrial = balTrial;
            trialModel = new TrialModels();
        }

        /// <summary>
        /// Get List of trials
        /// </summary>
        /// <param name="cc"></param>
        /// <returns></returns>
        [Route("trials/{cc?}")]
        [HttpGet]
        public async Task<IHttpActionResult> GetTrials(string cc)
        {
            var getAllTrial = await balTrial.GetAllTrialAsync(new CreateTrialRequestArgs
            {
                CC = cc
            });
            var columns = trialModel.GetTrialColumns();
            var values = new
            {
                Data = getAllTrial.Tables[0],
                InitialFields = columns
            };
            return JsonResult(values);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("trials")]
        [HttpPost]
        public async Task<IHttpActionResult> GetTrials([FromBody] TrialRequestArgs args)
        {
            var data = await balTrial.GetTrialsDataAsync(args);
            return JsonResult(data);
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("gettrials")]
        [HttpPost]
        public async Task<IHttpActionResult> SearchTrials([FromBody] TrialRequestArgs args)
        {
            var data = await balTrial.GetTrialsDataV2Async(args);
            return JsonResult(data);
        }



        /// <summary>
        /// 
        /// </summary>
        /// <param name="args"></param>
        /// <returns></returns>
        [Route("createtrial")]
        [HttpPost]
        public async Task<IHttpActionResult> CreateTrial([FromBody] CreateTrialRequestArgs args)
        {
            if (!string.IsNullOrWhiteSpace(args.TrialName))
            {
                var discoveryAPI = new DiscoveryAPI();
                var url = await discoveryAPI.GetServiceUrlAsync(MicroServices.ENTITIES);
                var entityAPI = new EntitiesAPI(url);
                var EZIDS = await entityAPI.CreateEZIDsAsync(new GenerateEZIDRequestArgs
                {
                    ETC = "TRI",
                    TotalEZID = 1
                });
                args.EZIDS = EZIDS;

                var CreateTrial = await balTrial.CreateTrialAsync(args);
                var value = new
                {
                    Data = CreateTrial.Tables[0]
                };
                return JsonResult(value);
            }
            return null;
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
