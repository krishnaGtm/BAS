using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Services.API.Core.Abstract;
using Enza.Trial.Entities.BDTOs.Args;
using Enza.Trial.Entities.Constants;

namespace Enza.Services.API.Trial
{
    public class TrialAPI : AbstractServiceClient
    {
        public TrialAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public TrialAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<DataTable> GetDataForTrialsAsync(TrialRequestArgs args)
        {
            var parameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("pfsid", args.PFSID.ToText()),
                new KeyValuePair<string, string>("etc", args.ETC.ToText()),
                new KeyValuePair<string, string>("ezids", args.EZIDS.ToText()),
                new KeyValuePair<string, string>("pcols", args.PCOLS.ToText())
            };
            var url = string.Concat(RouteConstants.API_TRIAL, "/trials/");
            return await PostAsync<DataTable>(url, parameters);
        }

        public async Task<DataTable> GetDataForTrialsV2Async(TrialRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_TRIAL, "/gettrials/");
            return await PostAsJsonAsync<DataTable, TrialRequestArgs>(url, args);
        }
    }
}
