using Enza.Patterns.Unity.Interfaces;
using Enza.Plants.BusinessAccess.Interfaces;
using Enza.Plants.DataAccess;
using Enza.Plants.DataAccess.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Plants.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IPlantRepository, PlantRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALPlant, BALPlant>(new HierarchicalLifetimeManager());
        }
    }
}
