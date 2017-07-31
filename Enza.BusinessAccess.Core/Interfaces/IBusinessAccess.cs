using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.Common.Args.Abstract;

namespace Enza.BusinessAccess.Core.Interfaces
{
    public interface IBusinessAccess<T> : IDisposable
    {
        Task<IEnumerable<T>> GetAllAsync();
        Task<IEnumerable<T>> GetAllAsync(RequestArgs args);
        Task<IEnumerable<T>> GetAllAsync(PagedRequestArgs args);
        Task<T> GetAsync(RequestArgs args);

        Task AddAsync(T entity);
        Task UpdateAsync(T entity);
        Task DeleteAsync(T entity);
    }
}