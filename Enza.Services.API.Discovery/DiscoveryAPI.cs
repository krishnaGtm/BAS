using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Enza.Common.Cache;
using Enza.Common.Helpers;
using Enza.Discovery.Entities;
using Enza.Services.API.Core.Abstract;
using Newtonsoft.Json;

namespace Enza.Services.API.Discovery
{
    public class MicroServiceItem
    {
        
    }

    public class DiscoveryAPI : AbstractServiceClient
    {
        private static readonly string svcUrl = ConfigurationManager.AppSettings["BAS:DISCOVERY_SVC_URL"];
        public DiscoveryAPI() : base(svcUrl)
        {
        }

        public async Task<List<ServiceSetting>> GetServicesAsync()
        {
            //var items = await MemCacheAsync.GetAsync("MS_DISCOVERY", async () =>
            //{
            //    //called if cache key is not present in the cache
            //    //call the discovery service. add to cache if service call is success.
            //    var data = await GetAsync<Dictionary<string, List<string>>>(string.Empty);

            //    return new ServiceSetting();
            //}, async args =>
            //{
            //    //called if item is removed from cache
            //    //call the discovery service. add to cache if service call is success. otherwise add old item in the cache again.
            //    try
            //    {
            //        var data = await GetAsync<Dictionary<string, List<string>>>(string.Empty);
            //    }
            //    catch
            //    {
            //    }
            //});

            var items = await MemCacheAsync.GetAsync("MS_DISCOVERY", async () =>
            {
                var dir = ConfigurationManager.AppSettings["BAS:AppData"];
                var env = ConfigurationManager.AppSettings["BAS:Environment"];
                var fileName = $"{dir.TrimEnd('\\')}\\{env}\\Services.json";
                if (!File.Exists(fileName))
                {
                    return null;
                }
                string json;
                using (var reader = File.OpenText(fileName))
                {
                    json = await reader.ReadToEndAsync();
                }
                if (string.IsNullOrWhiteSpace(json))
                {
                    return null;
                }
                return JsonConvert.DeserializeObject<List<ServiceSetting>>(json);
            });
            return items;
        }

        public async Task<string> GetServiceUrlAsync(string name)
        {
            var services = await GetServicesAsync();
            var service = services.FirstOrDefault(o => o.Name == name);
            if (service != null) return service.Url;
            return string.Empty;
        }

        public string GetServiceUrl(string name)
        {
            return AsyncHelper.RunSync(() => GetServiceUrlAsync(name));
        }

       
    }
}
