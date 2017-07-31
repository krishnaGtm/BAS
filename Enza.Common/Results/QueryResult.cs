namespace Enza.Common.Results
{
    public class QueryResult<T> where T : new()
    {
        public QueryResult()
        {
            Data = new T();
        }

        public bool Success { get; set; }
        public string Message { get; set; }
        public T Data { get; set; }
    }
}
