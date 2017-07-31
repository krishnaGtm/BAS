using System;

namespace Enza.Common.Exceptions
{
    public class BusinessException : ApplicationException
    {
        public BusinessException(string message) : base(message)
        {
        }

        public BusinessException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public BusinessException(string message, int errorCode)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public BusinessException(string message, Exception innerException, int errorCode)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
        }

        public int ErrorCode { get; }
    }
}
