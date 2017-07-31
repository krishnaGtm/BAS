using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.RegularExpressions;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Dispatcher;
using System.Web.Http.Routing;

namespace Enza.Services.Core.Versioning
{
    public class VersionControllerSelector : DefaultHttpControllerSelector
    {
        public VersionControllerSelector(HttpConfiguration configuration) : base(configuration)
        {
        }

        public override HttpControllerDescriptor SelectController(HttpRequestMessage request)
        {
            HttpControllerDescriptor controllerDescriptor = null;
            // get list of all controllers provided by the default selector
            var controllers = GetControllerMapping();
            var routeData = request.GetRouteData();
            if (routeData == null)
                throw new HttpResponseException(HttpStatusCode.NotFound);

            //check if this route is actually an attribute route
            var attributeSubRoutes = routeData.GetSubRoutes();
            var apiVersion = GetApiVersion(request);
            if (attributeSubRoutes == null)
            {
                var controllerName = GetRouteVariable<string>(routeData, "controller");
                if (controllerName == null)
                    throw new HttpResponseException(HttpStatusCode.NotFound);

                if (!string.IsNullOrWhiteSpace(apiVersion))
                {
                    controllerName = string.Concat(controllerName, "V", apiVersion);
                }
                if (controllers.TryGetValue(controllerName, out controllerDescriptor))
                {
                    return controllerDescriptor;
                }
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }
            // we want to find all controller descriptors whose controller type names end with
            // the following suffix(ex: CustomersV1)
            var filteredSubRoutes = attributeSubRoutes.Where(attrRouteData =>
            {
                var currentDescriptor = GetControllerDescriptor(attrRouteData);
                var controllerName = currentDescriptor.ControllerName;
                var version = controllerName[controllerName.Length - 1];

                var match = false;
                if (!string.IsNullOrWhiteSpace(apiVersion) && char.IsDigit(version))
                    match = true;
                else if (string.IsNullOrWhiteSpace(apiVersion) && !char.IsDigit(version))
                    match = true;

                //var match = currentDescriptor.ControllerName.EndsWith(suffix);
                if (match && (controllerDescriptor == null))
                {
                    controllerDescriptor = currentDescriptor;
                }
                return match;
            });
            routeData.Values["MS_SubRoutes"] = filteredSubRoutes.ToArray();
            return controllerDescriptor;
        }

        private HttpControllerDescriptor GetControllerDescriptor(IHttpRouteData routeData)
        {
            return ((HttpActionDescriptor[])routeData.Route.DataTokens["actions"]).First().ControllerDescriptor;
        }

        private static T GetRouteVariable<T>(IHttpRouteData routeData, string name)
        {
            object result;
            if (routeData.Values.TryGetValue(name, out result))
            {
                return (T)result;
            }
            return default(T);
        }
        private string GetApiVersion(HttpRequestMessage request)
        {
            if (request.Headers.Contains("X-Version"))
            {
                var headerValue = request.Headers.GetValues("X-Version").FirstOrDefault();
                return headerValue?.Replace(".", string.Empty).Replace("-", string.Empty);
            }
            return string.Empty;
        }

        public string RemoveDigits(string key)
        {
            return Regex.Replace(key, @"\d", string.Empty);
        }


    }
}
