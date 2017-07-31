using Enza.Common;

namespace Enza.Services.API.Core.Abstract
{
    public abstract class AbstractServiceClient : ServiceClientBase
    {
        protected AbstractServiceClient(string serviceBaseUrl, UserProfile context)
            : base(serviceBaseUrl)
        {
            Context = context;
        }

        protected AbstractServiceClient(string serviceBaseUrl)
            : base(serviceBaseUrl)
        {
        }

        protected UserProfile Context { get; set; }
    }
}