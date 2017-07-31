namespace Enza.Common
{
    public class TextValuePair<TText, TValue>
    {
        public TText Text { get; set; }
        public TValue Value { get; set; }
    }

    public class TextValuePair : TextValuePair<string, int>
    {
        
    }
}
