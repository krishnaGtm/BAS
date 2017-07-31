using Enza.Entities.BusinessAccess.Interfaces;
using Enza.Entities.DataAccess;
using Enza.Entities.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Entities.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IEntityRepository, EntityRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IGenerateEZIDRepository, GenerateEZIDRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IRelationRepository, RelationRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALEntity, BALEntity>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALGenerateEZID, BALGenerateEZID>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALRelation, BALRelation>(new HierarchicalLifetimeManager());
        }
    }
}
