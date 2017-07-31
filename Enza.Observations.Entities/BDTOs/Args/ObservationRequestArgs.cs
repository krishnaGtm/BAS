using Enza.Common.Args.Abstract;

namespace Enza.Observations.Entities.BDTOs.Args
{
    public class ObservationRequestArgs : PagedRequestArgs
    {
        //public int CGID { get; set; }
        public string CC { get; set; }
        public int? TFSID { get; set; }
        public int? PFSID { get; set; }
        public string TCOLS { get; set; }
        public string PCOLS { get; set; }
        public string ETC { get; set; }
        public string Year { get; set; }
        public int? EZID { get; set; }
        public int? Level { get; set; }
        public string EZIDS { get; set; }
        public string ETCS { get; set; }
    }
}
