using System.Collections.Generic;
using Enza.Common.Args.Abstract;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Enza.Groups.Entities.BDTOs.Args
{
    public class GroupRequestArgs : RequestArgs
    {
        [JsonIgnore]        
        public string User { get; set; }
    }

    public class CreateGroupRequestArgs : RequestArgs
    {
        public CreateGroupRequestArgs()
        {
            GroupLines = new List<TvpGroupInLine>();
        }

        [JsonIgnore]
        public int EZID { get; set; }

        [Required(ErrorMessage = "Please provide GroupName.")]
        public string GroupName { get; set; }

        public string Remark { get; set; }

        [JsonIgnore]
        public string User { get; set; }

        public List<TvpGroupInLine> GroupLines { get; set; }
    }
}
