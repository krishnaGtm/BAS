using System.Collections.Generic;
using System.Collections.Specialized;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Common.Extensions;
using Enza.Entities.Entities;
using Enza.Entities.Entities.BDTOs.Args;
using Enza.Entities.Entities.Constants;
using Enza.Services.API.Core.Abstract;
using System.Data;

namespace Enza.Services.API.Entities
{
    public class EntitiesAPI : AbstractServiceClient
    {
        public EntitiesAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public EntitiesAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<List<Entity>> GetDataForRelationshipAsync(RelationRequestArgs args)
        {
            //var parameters = new NameValueCollection
            //{
            //    ["EZID"] = args.EZID.ToText(),
            //    ["ETC"] = args.ETC               
            //};
            var url = string.Concat(RouteConstants.API_ENTITIES, "/Relation/");
            //return await GetAsync<List<Entity>>(url, parameters);
            return await PostAsync<List<Entity>>(url, args);
        }
        public async Task<DataTable> GetDataForRelationWithCountAsync(RelationRequestArgs args)
        {
            //var parameters = new NameValueCollection
            //{
            //    ["EZIDS"] = args.EZIDS
            //};
            var url = string.Concat(RouteConstants.API_ENTITIES, "/Relation/");
            //return await GetAsync<DataTable>(url, parameters);
            return await PostAsync<DataTable>(url, args);
            
        }
        public async Task<List<int>> CreateEZIDsAsync(GenerateEZIDRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_ENTITIES, "/GenerateEZIDs/");
            return await PostAsJsonAsync<List<int>, GenerateEZIDRequestArgs>(url, args);
        }
    }
}
