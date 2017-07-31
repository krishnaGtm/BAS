namespace Enza.DataAccess.Interfaces
{
    public interface IUserContext
    {
        string Name { get; set; }

        IUserContext GetContext();
    }
}
