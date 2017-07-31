using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Batches.BusinessAccess
{
    public class BatchContext : BALContext<Database>
    {
        public BatchContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}