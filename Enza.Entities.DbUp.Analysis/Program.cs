using System.Configuration;
using System.Reflection;
using DbUp;
namespace Enza.Entities.DbUp.Analysis
{
    class Program
    {
        static int Main(string[] args)
        {
            var connectionString =
                ConfigurationManager.ConnectionStrings["ConnectionStringAnalysis"].ConnectionString;
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
