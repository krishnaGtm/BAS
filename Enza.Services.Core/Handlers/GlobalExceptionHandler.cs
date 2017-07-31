using System.Net.Http;
using System.Web.Http;
using System.Web.Http.ExceptionHandling;
using System.Web.Http.Results;
using Enza.Common.Extensions;

namespace Enza.Services.Core.Handlers
{
    public class GlobalExceptionHandler : ExceptionHandler
    {
        public override bool ShouldHandle(ExceptionHandlerContext context)
        {
            return true;
        }
        public override void Handle(ExceptionHandlerContext context)
        {
            var exception = context.ExceptionContext.Exception.GetException();
            object logID, handled;
            context.Request.Properties.TryGetValue("uel:error_code", out logID);
            context.Request.Properties.TryGetValue("uel:handled", out handled);
            var error = new HttpError
            {
                {"code", logID},
                {"message", exception.Message},
                {"handled", handled}
            };
            var response = context.Request.CreateErrorResponse(System.Net.HttpStatusCode.InternalServerError, error);
            response.ReasonPhrase = exception.GetType().FullName;
            context.Result = new ResponseMessageResult(response);
        }
    }
}
