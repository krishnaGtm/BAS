using Enza.Patterns.Unity.Interfaces;
using Enza.Trial.BusinessAccess.Interfaces;
using Enza.Trial.DataAccess;
using Enza.Trial.DataAccess.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Trial.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<ITrialEntryRepository, TrialEntryRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<ITrialRepository, TrialRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALTrialEntry, BALTrialEntry>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALTrial, BALTrial>(new HierarchicalLifetimeManager());
        }
    }
}
