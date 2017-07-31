using Microsoft.Practices.Unity;

namespace Enza.Patterns.Unity.Interfaces
{
    public interface IUnityModule
    {
        void Register(IUnityContainer container);
    }

}
