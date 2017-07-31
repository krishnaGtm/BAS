using Enza.Common;
using Enza.Services.API.Core.Abstract;

namespace Enza.Services.API.Generals
{
    class GeneralAPI : AbstractServiceClient
    {
        public GeneralAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public GeneralAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }
    }
}
