namespace Enza.Patterns.Unity.Interfaces
{
    public interface IStrategyResolver
    {
        T Resolve<T>(string namedStrategy);
    }

    public interface IStrategyResolver<T>
    {
        T Resolve(string namedStrategy);
    }
}
