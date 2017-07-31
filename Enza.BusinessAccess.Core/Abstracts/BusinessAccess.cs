using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.Common.Args.Abstract;
using Enza.DataAccess.Interfaces;

namespace Enza.BusinessAccess.Core.Abstracts
{
    public abstract class BusinessAccess<T> : IBusinessAccess<T> where T : class
    {
        private bool disposed;
        protected BusinessAccess(IRepository<T> repository)
        {
            Repository = repository;
        }
        protected IRepository<T> Repository { get; }


        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await Repository.GetAllAsync();
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync(RequestArgs args)
        {
            return await Repository.GetAllAsync(args);
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync(PagedRequestArgs args)
        {
            return await Repository.GetAllAsync(args);
        }

        public virtual async Task<T> GetAsync(RequestArgs args)
        {
            return await Repository.GetAsync(args);
        }

        public virtual async Task AddAsync(T entity)
        {
            await Repository.AddAsync(entity);
        }

        public virtual async Task UpdateAsync(T entity)
        {
            await Repository.UpdateAsync(entity);
        }

        public virtual async Task DeleteAsync(T entity)
        {
            await Repository.DeleteAsync(entity);
        }

        #region IDisposable Members

        protected virtual void Dispose(bool disposing)
        {
            if (disposed) return;
            if (disposing)
            {

            }
            disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        
        ~BusinessAccess()
        {
            Dispose(false);
        }

        #endregion
    }
}