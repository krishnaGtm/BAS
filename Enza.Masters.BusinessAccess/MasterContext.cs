using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Masters.BusinessAccess
{
    public class MasterContext : BALContext<Database>
    {
        public MasterContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}