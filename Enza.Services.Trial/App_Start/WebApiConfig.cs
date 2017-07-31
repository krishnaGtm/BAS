using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Http.ExceptionHandling;
using Enza.Services.Core.Cors;
using Enza.Services.Core.Handlers;
using Enza.Services.Core.Versioning;

namespace Enza.Services.Trial
{
    /// <summary>
    /// 
    /// </summary>
    public static class WebApiConfig
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public static void Register(HttpConfiguration config)
        {
            //Dependency Injection
            UnityConfig.RegisterComponents(config);
            //Enable Cors
            CorsHelper.EnablesCors(config);
            // Web API configuration and services
            ConfigureServices(config);
            // Web API routes
            config.MapHttpAttributeRoutes();
            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            config.Formatters.Remove(config.Formatters.XmlFormatter);
        }

        static void ConfigureServices(HttpConfiguration config)
        {
            config.Services.Replace(typeof(IHttpControllerSelector), new VersionControllerSelector(config));

            config.Services.Add(typeof(IExceptionLogger), new GlobalErrorLogger());
            config.Services.Replace(typeof(IExceptionHandler), new GlobalExceptionHandler());
        }
    }
}
