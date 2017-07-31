using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Trial.BusinessAccess
{
    public class TrialContext : BALContext<Database>
    {
        public TrialContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}
