namespace Enza.Lots.Entities
{
    public class Lot
    {
        public int EZID { get; set; }
        public string CropCode { get; set; }
        public int LotNr { get; set; }
        public string MasterNr { get; set; }
        public string PONr { get; set; }
        public string GenerationCode { get; set; }
        public string Stem { get; set; }
        public string StemTail { get; set; }
        public string StembookDescription { get; set; }
        public string ResistanceExpected { get; set; }
    }
}
