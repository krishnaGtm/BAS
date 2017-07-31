using System;

namespace Enza.Observations.Entities
{
    public partial class Observation
    {
        public long ObservationID { get; set; }
        public int EZID { get; set; }
        public int TraitID { get; set; }
        public System.DateTime DateCreated { get; set; }
        public string UserIDCreated { get; set; }
        public Nullable<System.DateTime> DateUpdated { get; set; }
        public string UserIDUpdated { get; set; }
    }
}
