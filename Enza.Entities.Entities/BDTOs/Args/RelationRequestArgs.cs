using Enza.Common.Args.Abstract;

namespace Enza.Entities.Entities.BDTOs.Args
{
    public class RelationRequestArgs : RequestArgs
    {
        public int EZID { get; set; }
        public string ETC { get; set; }
        public string EZIDS { get; set; }
    }
}
