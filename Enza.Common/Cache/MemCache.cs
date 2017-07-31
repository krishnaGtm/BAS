using System;
using System.Runtime.Caching;
using System.Threading;
using System.Threading.Tasks;

namespace Enza.Common.Cache
{
    public class MemCache
    {
        public static T Get<T>(string cacheKey, Func<T> getItemCallback, CacheEntryRemovedCallback cacheRemovedCallback,
            int timeOut = 20) where T : class, new()
        {
            var policy = new CacheItemPolicy
            {
                AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(timeOut),
                RemovedCallback = cacheRemovedCallback
            };
            return Get(cacheKey, getItemCallback, policy);
        }

        public static T Get<T>(string cacheKey, Func<T> getItemCallback, int timeOut = 20) where T : class, new()
        {
            var policy = new CacheItemPolicy
            {
                //SlidingExpiration = TimeSpan.FromMinutes(timeOut)
                AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(timeOut),
                
            };
            return Get(cacheKey, getItemCallback, policy);
        }

        public static T Get<T>(string cacheKey, Func<T> getItemCallback, CacheItemPolicy policy) where T : class, new()
        {
            var cache = MemoryCache.Default;
            var item = cache.Get(cacheKey) as T;
            if (item == null)
            {
                item = getItemCallback();
                if (item != null)
                {
                    cache.Add(cacheKey, item, policy);
                }
            }
            return item;
        }

        public static T Get<T>(string cacheKey) where T : class
        {
            var cache = MemoryCache.Default;
            return cache.Get(cacheKey) as T;
        }

        public static void Add<T>(string cacheKey, T value, int timeOut = 20) where T : class, new()
        {
            var policy = new CacheItemPolicy
            {
                SlidingExpiration = TimeSpan.FromMinutes(timeOut)
                //AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(timeOut)
            };
            Add(cacheKey, value, policy);
        }

        public static void Add<T>(string cacheKey, T value, CacheItemPolicy policy) where T : class, new()
        {
            //remove if exists
            Remove(cacheKey);

            var cache = MemoryCache.Default;
            cache.Add(cacheKey, value, policy);
        }

        public static void Remove(string cacheKey)
        {
            var cache = MemoryCache.Default;
            if (cache.Contains(cacheKey))
            {
                cache.Remove(cacheKey);
            }
        }
    }

    public class MemCacheAsync
    {
        private static readonly SemaphoreSlim awaiter = new SemaphoreSlim(1);

        public static async Task<T> GetAsync<T>(string key, Func<Task<T>> getItemCallback, CacheItemPolicy policy)
        {
            var cache = MemoryCache.Default;
            var item = (T) cache.Get(key);
            if (item == null)
            {
                await awaiter.WaitAsync(10);
                try
                {
                    if (!cache.Contains(key))
                    {
                        item = await getItemCallback();
                        cache.Add(key, item, policy);
                    }
                }
                finally
                {
                    awaiter.Release();
                }
            }
            return item;
        }

        public static async Task<T> GetAsync<T>(string key, Func<Task<T>> getItemCallback, int timeOut = 20)
        {
            var policy = new CacheItemPolicy
            {
                //SlidingExpiration = TimeSpan.FromMinutes(timeOut)
                AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(timeOut),
            };
            return await GetAsync(key, getItemCallback, policy);
        }

        public static async Task<T> GetAsync<T>(string key, Func<Task<T>> getItemCallback,
            CacheEntryRemovedCallback cacheRemovedCallback, int timeOut = 20)
        {
            var policy = new CacheItemPolicy
            {
                AbsoluteExpiration = DateTimeOffset.UtcNow.AddMinutes(timeOut),
                RemovedCallback = cacheRemovedCallback
            };
            return await GetAsync(key, getItemCallback, policy);
        }
    }
}
