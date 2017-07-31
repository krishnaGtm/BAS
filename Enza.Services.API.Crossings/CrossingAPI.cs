using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Services.API.Core.Abstract;
using Enza.Crossing.Entities.BDTOs.Args;
using Enza.Crossing.Entities.Constants;

namespace Enza.Services.API.Crossings
{
    public class CrossingAPI : AbstractServiceClient
    {
        public CrossingAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public CrossingAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<DataTable> GetDataForCrossingAsync(CrossingRequestArgs args)
        {
            var parameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("pfsid", args.PFSID.ToText()),
                new KeyValuePair<string, string>("etc", args.ETC.ToText()),
                new KeyValuePair<string, string>("ezids", args.EZIDS.ToText()),
                new KeyValuePair<string, string>("pcols", args.PCOLS.ToText())
            };
            var url = string.Concat(RouteConstants.API_CROSSING, "/crossings/");
            return await PostAsync<DataTable>(url, parameters);
        }

        public async Task<DataTable> GetDataForCrossingV2Async(CrossingRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_CROSSING, "/getcrossings/");
            return await PostAsJsonAsync<DataTable, CrossingRequestArgs>(url, args);
        }
    }
}
