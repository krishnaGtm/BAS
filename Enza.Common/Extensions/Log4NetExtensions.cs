using System;
using log4net;

namespace Enza.Common.Extensions
{
    public static class Log4NetExtensions
    {
        private static ILog _logger;

        public static void LogDebug(this object o, Exception ex)
        {
            Initialize(o);
            if (_logger.IsDebugEnabled)
            {
                _logger.Debug(ex.GetException());
            }
        }

        public static void LogError(this object o, Exception ex)
        {
            Initialize(o);
            if (_logger.IsErrorEnabled)
            {
                _logger.Error(ex.GetException());
            }
        }

        public static void LogError(this Type type, Exception ex)
        {
            Initialize(type);
            if (_logger.IsErrorEnabled)
            {
                _logger.Error(ex.GetException());
            }
        }

        public static void Fatal(this object o, Exception ex)
        {
            Initialize(o);
            if (_logger.IsFatalEnabled)
            {
                _logger.Fatal(ex.GetException());
            }
        }

        public static void LogInfo(this object o, Exception ex)
        {
            Initialize(o);
            if (_logger.IsInfoEnabled)
            {
                _logger.Info(ex.GetException());
            }
        }

        private static void Initialize(object o)
        {
            Initialize(o.GetType());
        }

        private static void Initialize(Type type)
        {
            if (_logger == null)
            {
                _logger = LogManager.GetLogger(type);
            }
            else
            {
                if (_logger.Logger.Name != type.FullName)
                {
                    _logger = LogManager.GetLogger(type);
                }
            }
        }
    }
}