using System.Data;
using System.Threading.Tasks;
using Enza.Batches.Entities.BDTOs.Args;
using Enza.Batches.Entities.Constants;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Services.API.Core.Abstract;
using System.Collections.Generic;

namespace Enza.Services.API.Batches
{
    public class BatchesAPI : AbstractServiceClient
    {
        public BatchesAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public BatchesAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<DataTable> GetDataForBatchesAsync(BatchRequestArgs args)
        {
            var parameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("pfsid", args.PFSID.ToText()),
                new KeyValuePair<string, string>("etc", args.ETC.ToText()),
                new KeyValuePair<string, string>("ezids", args.EZIDS.ToText()),
                new KeyValuePair<string, string>("pcols", args.PCOLS.ToText())
            };
            var url = string.Concat(RouteConstants.API_BATCHES, "/batches/");
            return await PostAsync<DataTable>(url, parameters);
        }

        public async Task<DataTable> GetDataForBatchesV2Async(BatchRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_BATCHES, "/getbatches/");
            return await PostAsJsonAsync<DataTable, BatchRequestArgs>(url, args);
        }
    }
}
