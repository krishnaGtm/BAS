using Enza.BusinessAccess.Core.Abstracts;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Databases;

namespace Enza.Plants.BusinessAccess
{
    public class PlantContext : BALContext<Database>
    {
        public PlantContext() : base(new SqlDatabase("ConnectionString1"))
        {
        }
    }
}