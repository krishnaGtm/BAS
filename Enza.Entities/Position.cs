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
    
    public partial class Position
    {
        public long PositionID { get; set; }
        public int EZID { get; set; }
        public int LocationID { get; set; }
        public System.DateTime DateFrom { get; set; }
        public Nullable<System.DateTime> DateUntil { get; set; }
    
        public virtual Entity Entity { get; set; }
        public virtual PhysicalLocation PhysicalLocation { get; set; }
    }
}
