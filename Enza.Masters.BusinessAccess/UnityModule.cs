using Enza.Masters.BusinessAccess.Interfaces;
using Enza.Masters.DataAccess;
using Enza.Masters.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Masters.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IEntityTypeRepository, EntityTypeRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IFieldSetRepository, FieldSetRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ITraitRepository, TraitRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALEntityType, BALEntityType>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALFieldSet, BALFieldSet>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALTrait, BALTrait>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALCountry, BALCountry>(new HierarchicalLifetimeManager());
            container.RegisterType<ICountryRepository, CountryRepository>(new HierarchicalLifetimeManager());
        }
    }
}
