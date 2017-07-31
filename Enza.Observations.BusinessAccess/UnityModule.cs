using Enza.Observations.BusinessAccess.Interfaces;
using Enza.Observations.DataAccess;
using Enza.Observations.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Observations.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IObservationRepository, ObservationRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALObservation, BALObservation>(new HierarchicalLifetimeManager());
        }
    }
}
