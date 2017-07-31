using System;

namespace Enza.Common.Exceptions
{
    public class ApiException : ApplicationException
    {
        public ApiException(string message) : base(message)
        {
        }

        public ApiException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public ApiException(string code, string error, bool exceptionHandled) : base(error)
        {
            Code = code;
            Handled = exceptionHandled;
        }

        public string Code { get; }
        public bool Handled { get; }
    }
}
