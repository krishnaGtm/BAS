using Enza.Common.Args.Abstract;

namespace Enza.Masters.Entities.BDTOs.Args
{
    public class TraitRequestArgs : RequestArgs
    {
        public int? TFSID { get; set; }
        public int? PFSID { get; set; }
        public string TCOLS { get; set; }
        public string PCOLS { get; set; }
    }
}
