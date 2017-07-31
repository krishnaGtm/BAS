using Enza.Generals.BusinessAccess.Interfaces;
using Enza.Generals.DataAccess;
using Enza.Generals.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Generals.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<ICreateTempRepository, CreateTempRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALCreateTemp, BALCreateTemp>(new HierarchicalLifetimeManager());
        }
    }
}
