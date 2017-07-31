using System.Configuration;
using System.Reflection;
using DbUp;

namespace Enza.Crossing.DbUp.Admin
{
    class Program
    {
        static int Main(string[] args)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["ConnectionStringAdmin"].ConnectionString;
            var upgrader = DeployChanges
                .To
                .SqlDatabase(connectionString)
                .WithScriptsEmbeddedInAssembly(Assembly.GetExecutingAssembly())
                .LogToConsole()
                .Build();

            var result = upgrader.PerformUpgrade();
            if (!result.Successful)
            {
                return -1;
            }
            return 0;
        }
    }
}
