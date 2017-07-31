using Enza.Common.Args.Abstract;

namespace Enza.Masters.Entities.BDTOs.Args
{
    public class FieldSetRequestArgs : RequestArgs
    {
        //public int? CGID { get; set; }
        public string CC { get; set; }
        public bool AllCols { get; set; }
    }
}
