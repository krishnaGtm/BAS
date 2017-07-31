using Enza.Patterns.Unity.Interfaces;
using Microsoft.Practices.Unity;

namespace Enza.Patterns.Unity.Extensions
{
    public static class UnityExtensions
    {
        public static void RegisterModule(this IUnityContainer container, IUnityModule module)
        {
            module.Register(container);
        }
    }
}
