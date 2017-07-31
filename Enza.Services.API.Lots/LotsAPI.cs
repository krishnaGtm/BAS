using System.Data;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Lots.Entities.BDTOs.Args;
using Enza.Lots.Entities.Constants;
using Enza.Services.API.Core.Abstract;
using System.Collections.Generic;

namespace Enza.Services.API.Lots
{
    public class LotsAPI : AbstractServiceClient
    {
        public LotsAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public LotsAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<DataTable> GetDataForLotsAsync(LotRequestArgs args)
        {
            var parameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("pfsid", args.PFSID.ToText()),
                new KeyValuePair<string, string>("etc", args.ETC.ToText()),
                new KeyValuePair<string, string>("ezids", args.EZIDS.ToText()),
                new KeyValuePair<string, string>("pcols", args.PCOLS.ToText())
            };
            var url = string.Concat(RouteConstants.API_LOTS, "/lots/");
            return await PostAsync<DataTable>(url, parameters);
        }

        public async Task<DataTable> GetDataForLotsV2Async(LotRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_LOTS, "/getlots/");
            return await PostAsJsonAsync<DataTable, LotRequestArgs>(url, args);
        }
    }
}
