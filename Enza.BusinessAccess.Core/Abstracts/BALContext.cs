using System;
using System.Threading.Tasks;
using Enza.BusinessAccess.Core.Interfaces;
using Enza.DataAccess.Abstracts;

namespace Enza.BusinessAccess.Core.Abstracts
{
    public abstract class BALContext<T> : IDisposable, IBALContext<T> where T : Database
    {
        private bool disposed;

        protected BALContext(T dbContext)
        {
            DbContext = dbContext;
        }

        public T DbContext { get; }
        public async Task BeginAsync()
        {
            await DbContext.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await DbContext.CommitTransactionAsync();
        }

        public async Task RollbackAsync()
        {
            await DbContext.RollbackTransactionAsync();
        }

        #region IDisposable Members

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    DbContext?.Dispose();
                }
                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~BALContext()
        {
            Dispose(false);
        }

        #endregion
    }


    public abstract class BALContext : IDisposable, IBALContext
    {
        private bool disposed;

        protected BALContext(Database dbContext)
        {
            DbContext = dbContext;
        }

        public Database DbContext { get; }

        public async Task BeginAsync()
        {
            await DbContext.BeginTransactionAsync();
        }

        public async Task CommitAsync()
        {
            await DbContext.CommitTransactionAsync();
        }

        public async Task RollbackAsync()
        {
            await DbContext.RollbackTransactionAsync();
        }

        #region IDisposable Members

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    DbContext?.Dispose();
                }
                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        ~BALContext()
        {
            Dispose(false);
        }

        #endregion
    }
}