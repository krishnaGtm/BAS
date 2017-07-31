using Enza.Common.Args.Abstract;

namespace Enza.Gateway.Entities.BDTOs.Args
{
    public class GatewayRequestArgs : PagedRequestArgs
    {
        public int CGID { get; set; }
        public string CC { get; set; }
        public string ETC { get; set; }
        public int? TFSID { get; set; }
        public int? PFSID { get; set; }
        public int? EZID { get; set; }
        public int? Level { get; set; }
        public string TCOLS { get; set; }
        public string PCOLS { get; set; }
        public string EZIDs { get; set; }
        public string ETCS { get; set; }
        public string Year { get; set; }

        //Search Parameters
        public string FindDir { get; set; }
        public int? LastRowID { get; set; }
        public string FTSValue { get; set; }//FullTextSearch Value
    }
}
