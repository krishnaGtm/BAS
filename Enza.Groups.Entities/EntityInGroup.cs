
using System;

namespace Enza.Groups.Entities
{
    public class EntityInGroup
    {
        public int GroupEZID { get; set; }
        public int EZID { get; set; }
        public string EntityTypeCode { get; set; }
        public string EntityName { get; set; }        
        public DateTime UtcInsertDate { get; set; } 
    }
}
