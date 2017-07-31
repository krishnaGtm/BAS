using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Patterns.Unity
{
    public class StrategyResolver : IStrategyResolver
    {
        private readonly IUnityContainer container;
        public StrategyResolver(IUnityContainer unityContainer)
        {
            container = unityContainer;
        }
        public T Resolve<T>(string namedStrategy)
        {
            return container.Resolve<T>(namedStrategy);
        }
    }

    public class StrategyResolver<T> : IStrategyResolver<T>
    {
        private readonly IUnityContainer container;

        public StrategyResolver(IUnityContainer unityContainer)
        {
            container = unityContainer;
        }

        public T Resolve(string namedStrategy)
        {
            return container.Resolve<T>(namedStrategy);
        }
    }
}
