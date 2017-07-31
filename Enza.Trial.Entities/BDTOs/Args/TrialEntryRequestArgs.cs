using System.ComponentModel.DataAnnotations;
using Enza.Common.Args.Abstract;

namespace Enza.Trial.Entities.BDTOs.Args
{
    public class TrialEntryRequestArgs : RequestArgs
    {
        [Required]
        public string CC { get; set; }
        public int EZID { get; set; }
        [Required]
        public string Module { get; set; }
        [Required]
        public string User { get; set; }
    }
}
