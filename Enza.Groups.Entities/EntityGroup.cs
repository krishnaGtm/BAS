
using System;

namespace Enza.Groups.Entities
{
    public class EntityGroup
    {        
        public int EZID { get; set; }
        public string GroupName { get; set; }
        public DateTime? GroupUpdateDate { get; set; }
        public DateTime? LastUsedDate { get; set; }
        public string Remark { get; set; }
        public DateTime UtcInsertDate { get; set; }
        public string UserIdCreated { get; set; }
        public DateTime? UtcUpdateDate { get; set; }
        public string UserIdUpdated { get; set; }        
    }
}
