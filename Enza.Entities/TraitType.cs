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
    
    public partial class TraitType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public TraitType()
        {
            this.Traits = new HashSet<Trait>();
        }
    
        public int TraitTypeID { get; set; }
        public string TraitTypeName { get; set; }
        public int CropGroupID { get; set; }
    
        public virtual CropGroup CropGroup { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Trait> Traits { get; set; }
    }
}
