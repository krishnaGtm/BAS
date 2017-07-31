using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Enza.Common;
using Enza.Observations.Entities.BDTOs.Args;
using Enza.Observations.Entities.Constants;
using Enza.Services.API.Core.Abstract;

namespace Enza.Services.API.Observations
{
    public class ObservationsAPI : AbstractServiceClient
    {
        public ObservationsAPI(string serviceBaseUrl, UserProfile context) : base(serviceBaseUrl, context)
        {
        }

        public ObservationsAPI(string serviceBaseUrl) : base(serviceBaseUrl)
        {
        }

        public async Task<Dictionary<string, object>> GetDataForObservationsAsync(ObservationRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_OBSERVATIONS, "/observations/");
            //SetAuthToken("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiY3JvcCBzcGVjaWFsaXN0IiwidW5pcXVlX25hbWUiOiJLQVRITUFORFVcXGRzdXZlZGkiLCJlbnphdXRoLmNyb3BzIjoiVE8iLCJpc3MiOiJodHRwOi8vZW56YXV0aCIsImF1ZCI6Imh0dHA6Ly9lbnphdXRoIiwiZXhwIjoxNDgyOTI2MTMxLCJuYmYiOjE0ODI5MTg5MzF9.THHRntjImnuzDZNchlvimdhfiEQ1kjPf3xU3JKu5lnU");
            return await PostAsJsonAsync<Dictionary<string, object>,ObservationRequestArgs>(url, args);
        }

        public async Task<DataTable> GetDataForObservationsV2Async(ObservationRequestArgs args)
        {
            var url = string.Concat(RouteConstants.API_OBSERVATIONS, "/getobservations/");
            return await PostAsJsonAsync<DataTable, ObservationRequestArgs>(url, args);
        }
    }
}
