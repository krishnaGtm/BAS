using System.Net;
using System.Net.Security;

namespace Enza.Services.API.Core
{
    public class Ssl
    {
        public static void VerifyServerCertificate()
        {
            ServicePointManager.ServerCertificateValidationCallback = (sender, certificate, chain, errors) =>
            {
                if (errors == SslPolicyErrors.None)
                {
                    return true;
                }
                //thumbprint: 273B82DC57255C47C78D2AC0E8AEF2CF1C723827
                
                //var request = sender as HttpWebRequest;
                //if (request != null)
                //{
                //    return TrustedHosts.Contains(request.RequestUri.Host);
                //}

                return true;
            };
        }
    }
}
