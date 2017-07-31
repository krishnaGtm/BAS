using Enza.Common.Args.Abstract;

namespace Enza.Entities.Entities.BDTOs.Args
{
    public class EntityRequestArgs : PagedRequestArgs
    {
        public int CropGroupID { get; set; }
        public string CropCode { get; set; }
        public int? FieldSetID { get; set; }
        public string EntityTypeCode { get; set; }
        public int? EZID { get; set; }
        public int? Level { get; set; }
    }
}
