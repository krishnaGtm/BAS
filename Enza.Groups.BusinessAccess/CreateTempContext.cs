using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Generals.BusinessAccess
{
    public class CreateTempContext : BALContext<Database>
    {
        public CreateTempContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}
