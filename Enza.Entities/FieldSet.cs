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
    
    public partial class FieldSet
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public FieldSet()
        {
            this.TraitInFieldSets = new HashSet<TraitInFieldSet>();
        }
    
        public int FieldSetID { get; set; }
        public string FieldSetCode { get; set; }
        public string FieldSetName { get; set; }
        public int CropGroupID { get; set; }
        public string CropCode { get; set; }
    
        public virtual CropGroup CropGroup { get; set; }
        public virtual CropRD CropRD { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<TraitInFieldSet> TraitInFieldSets { get; set; }
    }
}
