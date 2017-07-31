using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using Enza.Common.Cache;
using Enza.Services.Common.Cors;

namespace Enza.Services.Core.Cors
{
    public class CorsHelper
    {
        public static void EnablesCors(HttpConfiguration config)
        {
            var origins = new List<string>(new[] {"*"});
            var lines = MemCache.Get("MS_ORIGINS", () =>
            {
                var items = new List<string>();
                var dir = ConfigurationManager.AppSettings["BAS:AppData"];
                var env = ConfigurationManager.AppSettings["BAS:Environment"];
                var file = $"{dir.TrimEnd('\\')}\\{env}\\Origins.json";
                if (File.Exists(file))
                {
                    items = File.ReadAllLines(file)
                        .Select(o => o.Trim())
                        .Where(o => !string.IsNullOrWhiteSpace(o))
                        .ToList();

                }
                return items;
            });
            if (lines.Any())
            {
                origins = lines;
            }
            var policy = new EnzaCorsPolicyProvider(origins)
            {
                AllowAnyHeader = true,
                AllowAnyMethod = true,
                SupportsCredentials = true
            };
            config.EnableCors(policy);
        }

        public static void HandlePreflightRequest(HttpApplication app)
        {
            var request = app.Request;
            var response = app.Response;
            if (request.HttpMethod == "OPTIONS")
            {
                var origin = request.Headers.Get("Origin");
                if (!string.IsNullOrWhiteSpace(origin))
                {
                    response.AddHeader("Cache-Control", "no-cache");
                    response.AddHeader("Access-Control-Allow-Origin", origin);
                    response.AddHeader("Access-Control-Allow-Credentials", "true");
                    response.AddHeader("Access-Control-Allow-Methods", "GET,HEAD,POST,PUT,DELETE,CONNECT,OPTIONS,TRACE,PATCH");
                    response.AddHeader("Access-Control-Allow-Headers", "enzauth,X-Version,origin,Content-Type,Accept");
                    response.AddHeader("Access-Control-Max-Age", int.MaxValue.ToString());
                    response.StatusCode = (int) HttpStatusCode.OK;
                    app.CompleteRequest();
                }
            }
        }
    }
}
