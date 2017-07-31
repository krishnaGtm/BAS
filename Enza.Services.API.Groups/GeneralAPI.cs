using Enza.Common;
using Enza.Services.API.Core.Abstract;

namespace Enza.Services.API.Groups
{
    class GroupAPI : AbstractServiceClient
    {
        public GroupAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public GroupAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }
    }
}
