using System;
using System.Configuration;
using System.Net;
using System.Web;
using Enza.Services.API.Discovery;

namespace Enza.Services.API.UEL
{
    public class UELServiceAPI
    {
        Proxy.createUelRecord GetErrorModel(Exception ex)
        {
            var environment = ConfigurationManager.AppSettings["BAS:Environment"];
            var location = ConfigurationManager.AppSettings["BAS:ServiceName"];
            if (string.IsNullOrEmpty(environment))
            {
                environment = "N/A";
            }
            var error = ex.Message;
            var model = new Proxy.createUelRecord
            {
                Application = "11",
                Environment = environment,
                Location = location,
                ErrorDetailText = error,
                instanceProperties = new Proxy.createUelRecordInstanceProperties
                {
                    organization = "EnzaZaden",
                    processDescription = ex.StackTrace
                }
            };
            return model;
        }

        public bool LogError(Exception ex, out string logID)
        {
            var discoveryAPI = new DiscoveryAPI();
            var logServiceUrl = discoveryAPI.GetServiceUrl("UEL");
            var credential = GetCredentials();
            using (var svc = new Proxy.UELServiceBindingService
            {
                Url = logServiceUrl,
                Credentials = new NetworkCredential(credential.Item1, credential.Item2)
            })
            {
                var userName = "anonymous";
                var context = HttpContext.Current;
                if (context?.User?.Identity != null)
                {
                    userName = context.User.Identity.Name;
                }
                var model = GetErrorModel(ex);
                model.Userid = userName;
                var resp = svc.createUELRecordProcess(new Proxy.createUELRecordProcess
                {
                    createUelRecord = model
                });
                var rs = resp.createUelRecordResponse;
                logID = rs.logID;

                return (rs?.result == "0");
            }
        }

        Tuple<string, string> GetCredentials()
        {
            var credentials = ConfigurationManager.AppSettings["BAS:UELCredentials"];
            var chunks = credentials.Split(new[] {'|'}, 2);
            if (chunks.Length == 2)
            {
                return new Tuple<string, string>(chunks[0], chunks[1]);
            }
            return new Tuple<string, string>(chunks[0], string.Empty);
        }
    }
}
