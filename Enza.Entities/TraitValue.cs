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
    
    public partial class TraitValue
    {
        public int TraitValueID { get; set; }
        public int TraitID { get; set; }
        public string TraitValueCode { get; set; }
        public string TraitValueName { get; set; }
        public Nullable<int> SortingOrder { get; set; }
    
        public virtual Trait Trait { get; set; }
    }
}
