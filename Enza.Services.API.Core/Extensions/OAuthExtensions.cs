using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;

namespace Enza.Services.API.Core.Extensions
{
    public static class OAuthExtensions
    {
        public static void SetToken(this HttpClient client, string scheme, string token)
        {
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(scheme, token);
        }

        public static void SetBearerToken(this HttpClient client, string token)
        {
            SetToken(client, "Bearer", token);
        }

        public static string GetAccessToken(this ClaimsIdentity identity)
        {
            var claim = identity.Claims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier);
            if (claim == null) return string.Empty;
            return claim.Value;
        }
    }
}
