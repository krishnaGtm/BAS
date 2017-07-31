using System.Threading.Tasks;
using Enza.DataAccess.Abstracts;

namespace Enza.BusinessAccess.Core.Interfaces
{
    public interface IBALContext<out T> where T : Database
    {
        T DbContext { get; }

        Task BeginAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }

    public interface IBALContext
    {
        Database DbContext { get; }
        Task BeginAsync();
        Task CommitAsync();
        Task RollbackAsync();
    }

}
