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
    
    public partial class TraitInFieldSet
    {
        public int FieldSetID { get; set; }
        public int TraitID { get; set; }
        public Nullable<int> SortingOrder { get; set; }
    
        public virtual FieldSet FieldSet { get; set; }
        public virtual Trait Trait { get; set; }
    }
}