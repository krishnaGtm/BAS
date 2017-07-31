namespace Enza.Common
{
    public class JsonObject : JsonObject<object>
    {

    }

    public class JsonObject<TResult>
    {
        public bool Success { get; set; }
        public string Message { get; set; }
        public TResult Data { get; set; }
    }
}
