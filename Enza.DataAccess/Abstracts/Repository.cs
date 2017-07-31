using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Enza.Common.Args.Abstract;
using Enza.DataAccess.Interfaces;

namespace Enza.DataAccess.Abstracts
{
    public abstract class Repository<T> : IRepository<T> where T : class
    {
        private bool disposed;

        protected Repository(IDatabase dbContext)
        {
            DbContext = dbContext;
        }

        protected IDatabase DbContext { get; }

        public virtual Task<IEnumerable<T>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public virtual Task<IEnumerable<T>> GetAllAsync(RequestArgs args)
        {
            throw new NotImplementedException();
        }

        public virtual Task<IEnumerable<T>> GetAllAsync(PagedRequestArgs args)
        {
            throw new NotImplementedException();
        }

        public virtual Task<T> GetAsync(RequestArgs args)
        {
            throw new NotImplementedException();
        }

        public virtual Task AddAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Task UpdateAsync(T entity)
        {
            throw new NotImplementedException();
        }

        public virtual Task DeleteAsync(T entity)
        {
            throw new NotImplementedException();
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

        ~Repository()
        {
            Dispose(false);
        }

        #endregion
    }
}
