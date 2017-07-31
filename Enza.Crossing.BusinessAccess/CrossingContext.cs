using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Crossing.BusinessAccess
{
    public class CrossingContext : BALContext<Database>
    {
        public CrossingContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}
