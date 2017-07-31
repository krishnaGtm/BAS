using System;
using System.Collections.Specialized;
using System.Linq;
using System.Web;

namespace Enza.Services.API.Core.Extensions
{
    public static class UrlExtensions
    {
        public static string ToQueryString(this NameValueCollection source, bool urlEncode = true)
        {
            var getValue = new Func<string, string>(o => urlEncode ? HttpUtility.UrlEncode(o) : o);
            return string.Join("&", source.AllKeys
                .SelectMany(key => source.GetValues(key)
                    .Select(value => $"{getValue(key)}={getValue(value)}"))
                .ToArray());
        }
    }
}
