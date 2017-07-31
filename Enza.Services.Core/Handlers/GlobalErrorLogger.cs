using System;
using System.Configuration;
using System.Web.Http.ExceptionHandling;
using Enza.Common.Exceptions;
using Enza.Common.Extensions;
using Enza.Services.API.UEL;
using log4net;

namespace Enza.Services.Core.Handlers
{
    public class GlobalErrorLogger : ExceptionLogger
    {
        private readonly ILog logger;
        public GlobalErrorLogger()
        {
            logger = LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);
        }
        public override void Log(ExceptionLoggerContext context)
        {
            if (logger.IsErrorEnabled)
            {
                var exception = context.Exception.GetException();
                //skip already handled exception
                var apiException = exception as ApiException;
                if (apiException != null)
                {
                    context.Request.Properties["uel:error_code"] = apiException.Code;
                    context.Request.Properties["uel:handled"] = apiException.Handled;

                    if (apiException.Handled)
                        return;
                }

                logger.Error(exception);
                //Log error in cordys
                string logID;
                CreateUELLog(exception, out logID);
                //set logID to request object to pass it to exception handling
                context.Request.Properties["uel:error_code"] = logID;
                context.Request.Properties["uel:handled"] = true;
            }
        }

        private void CreateUELLog(Exception ex, out string logID)
        {
            logID = string.Empty;

            bool uelEnabled;
            bool.TryParse(ConfigurationManager.AppSettings["BAS:UELEnabled"], out uelEnabled);
            if (uelEnabled)
            {
                UELServiceAPI logAPI;
                try
                {
                    logAPI = new UELServiceAPI();
                    logAPI.LogError(ex, out logID);
                }
                catch (Exception ex2)
                {
                    //log if there is problem with UEL access problem
                    logger.Error(ex2);
                }
                finally
                {
                    logAPI = null;
                }
            }
        }
    }
}
