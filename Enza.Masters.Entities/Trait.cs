using System;

namespace Enza.Masters.Entities
{
    public class Trait
    {
        public int TraitID { get; set; }
        public int TraitTypeID { get; set; }
        public string TraitName { get; set; }
        public string ColumnLabel { get; set; }
        public string DataType { get; set; }
        public string DisplayFormat { get; set; }
        public bool Editor { get; set; }
        public bool ListOfValues { get; set; }
        public int? MinValue { get; set; }
        public int? MaxValue { get; set; }
        public bool Property { get; set; }
        public bool Updatable { get; set; }
        public int? SortOrder { get; set; }
    }
}
