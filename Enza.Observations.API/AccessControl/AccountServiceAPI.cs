using Enza.Common;
using Enza.Common.Helpers;
using Enza.Services.API.Core.Abstract;

namespace Enza.Observations.API.AccessControl
{
    public class AccountServiceAPI : AbstractServiceClient
    {
        public AccountServiceAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public AccountServiceAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public UserProfile GetUserProfile()
        {
            //return Task.Run(async () => await GetUserProfileAsync()).Result;
            return AsyncHelper.RunSync(() => GetAsync<UserProfile>("api/Users/Profile"));
        }

       
    }
}
