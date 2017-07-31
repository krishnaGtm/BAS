using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Observations.BusinessAccess
{
    public class ObservationContext : BALContext<Database>
    {
        public ObservationContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}