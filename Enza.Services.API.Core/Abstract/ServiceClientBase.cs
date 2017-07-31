using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Enza.Common.Exceptions;
using Enza.Services.API.Core.Bdtos;
using Enza.Services.API.Core.Extensions;
using Newtonsoft.Json;

namespace Enza.Services.API.Core.Abstract
{
    public abstract class ServiceClientBase : IDisposable
    {
        private bool disposed;
        private HttpClient client;
        private HttpClientHandler handler;

        protected ServiceClientBase(string baseUrl)
        {
            handler = new HttpClientHandler
            {
                PreAuthenticate = true,
                UseDefaultCredentials = true,
                CookieContainer = new CookieContainer(),
                AutomaticDecompression = DecompressionMethods.GZip | DecompressionMethods.Deflate
            };
            client = new HttpClient(handler);
            if (!string.IsNullOrWhiteSpace(baseUrl))
            {
                client.BaseAddress = new Uri(baseUrl);
            }
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            Ssl.VerifyServerCertificate();
        }

        string CreateURL(string segment, NameValueCollection args)
        {
            var queryString = args?.ToQueryString();
            if (!string.IsNullOrWhiteSpace(queryString))
            {
                return string.Concat(segment, "?", queryString);
            }
            return segment;
        }

        public void SetAuthToken(string token)
        {
            var key = "enzauth";
            if (!client.DefaultRequestHeaders.Contains(key))
            {
                client.DefaultRequestHeaders.Add(key, token);
            }
        }

        public void AddHeader(string key, string value)
        {
            if (!client.DefaultRequestHeaders.Contains(key))
            {
                client.DefaultRequestHeaders.Add(key, value);
            }
        }

        public void AddCookie(Cookie cookie)
        {
            handler.CookieContainer.Add(cookie);
        }

        public void AddVersion(int version)
        {
            if (!client.DefaultRequestHeaders.Contains("X-Version"))
            {
                client.DefaultRequestHeaders.Add("X-Version", version.ToString());
            }
        }

        public bool EnableCompression
        {
            set
            {
                if (value)
                {
                    var header = new StringWithQualityHeaderValue("gzip");
                    var encoding = client.DefaultRequestHeaders.AcceptEncoding;
                    if (!encoding.Contains(header))
                    {
                        encoding.Add(header);
                    }
                }
            }
        }

        public Cookie GetCookie(string path, string name)
        {
            return handler.CookieContainer.GetCookies(new Uri(path))[name];
        }

        protected async Task<T> GetAsync<T>(string segment, NameValueCollection args)
        {
            var url = CreateURL(segment, args);
            var response = await client.GetAsync(url);
            var rs = await response.Content.ReadAsStringAsync();
            //Parse and throw exception if response is not success.
            EnsureSuccessStatusCode(response, rs);
            return JsonConvert.DeserializeObject<T>(rs);
        }
        protected async Task<T> GetAsync<T>(string segment)
        {
            return await GetAsync<T>(segment, args: null);
        }

        protected async Task<T> PostAsync<T>(string segment, object args)
        {
            var url = segment;

            //Ssl.VerifyServerCertificate();

            var response = await client.PostAsJsonAsync(url, args);
            var rs = await response.Content.ReadAsStringAsync();
            //Parse and throw exception if response is not success.
            EnsureSuccessStatusCode(response, rs);
            return JsonConvert.DeserializeObject<T>(rs);
        }
        protected async Task<T> PostAsync<T>(string segment, List<KeyValuePair<string, string>> args)
        {
            var url = segment;
            var content = new FormUrlEncodedContent(args);

            //Ssl.VerifyServerCertificate();

            var response = await client.PostAsync(url, content);
            var rs = await response.Content.ReadAsStringAsync();
            //Parse and throw exception if response is not success.
            EnsureSuccessStatusCode(response, rs);
            return JsonConvert.DeserializeObject<T>(rs);
        }
        protected async Task<T> PostAsync<T>(string segment, Action<List<KeyValuePair<string, string>>> action)
        {
            var parameters = new List<KeyValuePair<string, string>>();
            action(parameters);
            return await PostAsync<T>(segment, parameters);
        }
        protected async Task<T> PostAsJsonAsync<T, TArgs>(string segment, TArgs args)
        {
            var url = segment;

            //Ssl.VerifyServerCertificate();

            var response = await client.PostAsJsonAsync(url, args);
            var rs = await response.Content.ReadAsStringAsync();
            //throw new Exception("LOG:" + rs);
            //Parse and throw exception if response is not success.
            EnsureSuccessStatusCode(response, rs);
            return JsonConvert.DeserializeObject<T>(rs);
        }

        private void EnsureSuccessStatusCode(HttpResponseMessage response, string rs)
        {
            if (!response.IsSuccessStatusCode)
            {
                var error = new ErrorInfo();
                var status = response.StatusCode;
                switch (status)
                {
                    case HttpStatusCode.NotFound:
                        error.Message = $"Resource {response.RequestMessage.RequestUri.AbsoluteUri} not found.";
                        break;
                    default:
                        error = JsonConvert.DeserializeObject<ErrorInfo>(rs);
                        break;
                }
                throw new ApiException(error.Code, error.Message, error.Handled);
            }
        }

        #region IDisposable Members

        ~ServiceClientBase()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposed) return;
            if (disposing)
            {
                if(client != null)
                {
                    client.Dispose();
                    client = null;
                }
                if(handler != null)
                {
                    handler.Dispose();
                    handler = null;
                }
            }
            disposed = true;
        }

        #endregion
    }
}
