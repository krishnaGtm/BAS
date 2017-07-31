using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Entities.BusinessAccess
{
    public class EntityContext : BALContext<Database>
    {
        public EntityContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}