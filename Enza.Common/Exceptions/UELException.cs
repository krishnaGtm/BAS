using System;

namespace Enza.Common.Exceptions
{
    public class UELException : ApplicationException
    {
        public UELException(string message) : base(message)
        {
        }

        public UELException(string message, Exception innerException)
            : base(message, innerException)
        {
        }

        public UELException(Exception ex):base(ex.Message)
        {
           
        }

        public string LogID { get; set; }
      
    }
}
