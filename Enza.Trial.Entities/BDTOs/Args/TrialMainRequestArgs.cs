using System.ComponentModel.DataAnnotations;
using Enza.Common.Args.Abstract;

namespace Enza.Trial.Entities.BDTOs.Args
{
    public class TrialMainRequestArgs : PagedRequestArgs
    {
        public string CropCode { get; set; }
        public int? PFSID { get; set; }
        [Required]
        public string ETC { get; set; }
        [Required]
        public string EZIDS { get; set; }
        public string PCOLS { get; set; }


    }
}
