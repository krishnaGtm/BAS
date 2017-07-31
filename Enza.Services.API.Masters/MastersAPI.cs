using System.Collections.Generic;
using System.Collections.Specialized;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Masters.Entities;
using Enza.Masters.Entities.BDTOs.Args;
using Enza.Masters.Entities.Constants;
using Enza.Services.API.Core.Abstract;

namespace Enza.Services.API.Masters
{
    public class MastersAPI : AbstractServiceClient
    {
        public MastersAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public MastersAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<List<EntityType>> GetEntityTypesAsync(string entityTypeCode)
        {
            var url = string.Concat(RouteConstants.API_MASTERS, "/EntityType/?EntityTypeCode=", entityTypeCode);
            return await GetAsync<List<EntityType>>(url);
        }

        public async Task<List<Trait>> GetColumnsAsync(TraitRequestArgs args)
        {
            var parameters = new NameValueCollection
            {
                ["tfsid"] = args.TFSID.ToText(),
                ["pfsid"] = args.PFSID.ToText(),
                ["tcols"] = args.TCOLS,
                ["pcols"] = args.PCOLS
            };
            var url = string.Concat(RouteConstants.API_MASTERS, "/Trait/");
            return await GetAsync<List<Trait>>(url, parameters);
        }
    }
}
