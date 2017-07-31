namespace Enza.Services.API.Core.Bdtos
{
    public class ErrorInfo
    {
        public string Code { get; set; }
        public string Message { get; set; }
        public bool Handled { get; set; }
        public override string ToString()
        {
            //var msg = ExceptionMessage;
            //if (string.IsNullOrWhiteSpace(msg))
            //{
            //    msg = Message;
            //}
            var msg = Message;
            return !string.IsNullOrWhiteSpace(msg) ? msg : base.ToString();
        }
    }
}
