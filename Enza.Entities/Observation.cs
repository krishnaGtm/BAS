//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Enza.Entities
{
    using System;
    using System.Collections.Generic;
    
    public partial class Observation
    {
        public long ObservationID { get; set; }
        public int EZID { get; set; }
        public int TraitID { get; set; }
        public System.DateTime DateCreated { get; set; }
        public string UserIDCreated { get; set; }
        public Nullable<System.DateTime> DateUpdated { get; set; }
        public string UserIDUpdated { get; set; }
    
        public virtual Entity Entity { get; set; }
        public virtual ObsChar ObsChar { get; set; }
        public virtual ObsDate ObsDate { get; set; }
        public virtual ObsDec ObsDec { get; set; }
        public virtual Trait Trait { get; set; }
        public virtual ObsInt ObsInt { get; set; }
    }
}
