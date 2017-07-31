using Enza.Lots.BusinessAccess.Interfaces;
using Enza.Lots.DataAccess;
using Enza.Lots.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Lots.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<ILotRepository, LotRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALLot, BALLot>(new HierarchicalLifetimeManager());
        }
    }
}
