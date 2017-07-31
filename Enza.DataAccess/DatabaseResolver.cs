using Enza.DataAccess.Interfaces;
using Enza.Patterns.Unity;
using Microsoft.Practices.Unity;

namespace Enza.DataAccess
{
    public class DatabaseResolver : StrategyResolver<IDatabase>, IDatabaseResolver
    {
        public DatabaseResolver(IUnityContainer unityContainer) : base(unityContainer)
        {
        }
    }
}
