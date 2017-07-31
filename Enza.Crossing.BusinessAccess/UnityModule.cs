using Enza.Crossing.BusinessAccess.Interfaces;
using Enza.Crossing.DataAccess;
using Enza.Crossing.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Crossing.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<ICrossingRepository, CrossingRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALCrossing, BALCrossing>(new HierarchicalLifetimeManager());
        }
    }
}
