using System.Collections.Generic;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Cors;
using System.Web.Http.Cors;

namespace Enza.Services.Common.Cors
{
    public class EnzaCorsPolicyProvider : ICorsPolicyProvider
    {
        public EnzaCorsPolicyProvider(IList<string> origins)
        {
            Origins = origins;
        }

        public IList<string> Origins { get;}
        public bool AllowAnyHeader { get; set; }
        public bool AllowAnyMethod { get; set; }
        public bool SupportsCredentials { get; set; }

        public async Task<CorsPolicy> GetCorsPolicyAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var context = request.GetCorsRequestContext();
            var origin = context.Origin;
            if (await IsValidOriginAsync(origin))
            {
                // Grant CORS request
                var policy = new CorsPolicy
                {
                    AllowAnyHeader = AllowAnyHeader,
                    AllowAnyMethod = AllowAnyMethod,
                    SupportsCredentials = SupportsCredentials
                };
                policy.Origins.Add(origin);
                return policy;
            }
            // Reject CORS request
            return null;
        }

        private async Task<bool> IsValidOriginAsync(string origin)
        {
            if (string.IsNullOrWhiteSpace(origin))
            {
                return await Task.FromResult(true);
            }
            if (Origins.Count > 0)
            {
                var allowed = Origins.Contains(origin);
                return await Task.FromResult(allowed);
            }
            return await Task.FromResult(true);
        }
    }
}
