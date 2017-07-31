using Enza.Common.Args.Abstract;
using System.Collections.Generic;
using System.Data;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace Enza.Groups.Entities.BDTOs.Args
{
    public class GroupLineRequestArgs : RequestArgs
    {
        [Required(ErrorMessage = "Please provide Group EZID.")]
        public int EZID { get; set; }
        
    }
    public class CreateGroupLineRequestArgs:RequestArgs
    {
        [Required(ErrorMessage = "Please provide Valid Data.")]
        public List<TvpGroupInLine> GroupLineData { get; set; }        
        public DataTable GetTempTable()
        {
            var dt = new DataTable("TempTableGroupInLine");
            dt.Columns.Add("GroupEZID", typeof(int));
            dt.Columns.Add("EZID", typeof(int));
            dt.Columns.Add("EntityTypeCode", typeof(string));
            dt.Columns.Add("EntityName", typeof(string));
            foreach (var item in GroupLineData)
            {
                var dr = dt.NewRow();
                dr["GroupEZID"] = item.GroupEZID;
                dr["EZID"] = item.EZID;
                dr["EntityTypeCode"] = item.ETC;
                dr["EntityName"] = item.Name;
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }

}
