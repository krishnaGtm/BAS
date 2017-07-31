using Enza.Groups.BusinessAccess.Interfaces;
using Enza.Groups.DataAccess;
using Enza.Groups.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Groups.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IEntityGroupRepository, EntityGroupRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALEntityGroup, BALEntityGroup>(new HierarchicalLifetimeManager());

            container.RegisterType<IEntityInGroupRepository, EntityInGroupRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALEntityInGroup, BALEntityInGroup>(new HierarchicalLifetimeManager());

        }
    }
}
