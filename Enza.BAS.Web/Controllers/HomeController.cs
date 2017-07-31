using System;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;
using Enza.Common.Extensions;
using Enza.Services.API.Discovery;

namespace Enza.BAS.Web.Controllers
{
    public class HomeController : BaseController
    {
        public async Task<ActionResult> Index()
        {
            var json = "{}";
            try
            {
                var api = new DiscoveryAPI();
                var services = await api.GetServicesAsync();
                var svcs = services.Select(o => new
                {
                    o.Name,
                    o.Url
                }).ToDictionary(k => k.Name, v => v.Url);
                json = svcs.ToJson();
            }
            catch (Exception ex)
            {
                this.LogError(ex);
            }
            ViewBag.Services = json;
            return View();
        }
    }
}