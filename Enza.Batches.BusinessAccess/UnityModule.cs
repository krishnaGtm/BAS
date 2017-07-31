using Enza.Batches.BusinessAccess.Interfaces;
using Enza.Batches.DataAccess;
using Enza.Batches.DataAccess.Interfaces;
using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Batches.BusinessAccess
{
    public class UnityModule : IUnityModule
    {
        public void Register(IUnityContainer container)
        {
            container.RegisterType<IBatchRepository, BatchRepository>(new HierarchicalLifetimeManager());
            container.RegisterType<IBALBatch, BALBatch>(new HierarchicalLifetimeManager());
        }
    }
}
