using System;

namespace Enza.Common.Exceptions
{
    public class BusinessRuleException : ApplicationException
    {
        public BusinessRuleException(string message) : base(message)
        {
        }

        public BusinessRuleException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public BusinessRuleException(string message, int errorCode)
            : base(message)
        {
            ErrorCode = errorCode;
        }

        public BusinessRuleException(string message, Exception innerException, int errorCode)
            : base(message, innerException)
        {
            ErrorCode = errorCode;
        }

        public int ErrorCode { get; }
    }
}
