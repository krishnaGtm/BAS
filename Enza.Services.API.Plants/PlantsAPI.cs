using System.Data;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Plants.Entities.BDTOs.Args;
using Enza.Plants.Entities.Constants;
using Enza.Services.API.Core.Abstract;
using System.Collections.Generic;

namespace Enza.Services.API.Plants
{
    public class PlantsAPI : AbstractServiceClient
    {
        public PlantsAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public PlantsAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<DataTable> GetDataForPlantsAsync(PlantRequestArgs args)
        {
            var parameters = new List<KeyValuePair<string, string>>
            {
                new KeyValuePair<string, string>("pfsid",args.PFSID.ToText()),
                new KeyValuePair<string, string>("etc",args.ETC.ToText()),
                new KeyValuePair<string, string>("ezids",args.EZIDS.ToText()),
                new KeyValuePair<string, string>("pcols",args.PCOLS.ToText())
            };
            var url = string.Concat(RouteConstants.API_PLANTS, "/plants/");
            return await PostAsync<DataTable>(url, parameters);
        }

        public async Task<DataTable> GetDataForPlantsV2Async(PlantRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_PLANTS, "/getplants/");
            return await PostAsJsonAsync<DataTable, PlantRequestArgs>(url, args);
        }
    }
}
