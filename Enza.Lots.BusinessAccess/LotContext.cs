using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Lots.BusinessAccess
{
    public class LotContext : BALContext<Database>
    {
        public LotContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}