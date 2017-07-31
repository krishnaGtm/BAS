using Enza.Common.Args.Abstract;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;

namespace Enza.Trial.Entities.BDTOs.Args
{
    public class CreateTrialRequestArgs : RequestArgs
    {
        [Required]
        public string CC { get; set; }
        public string User { get; set; }
        public string TrialName { get; set; }
        public int? TrialTypeID { get; set; }
        public string CountryCode { get; set; }
        public int? TrialRegionID { get; set; }
        public List<int> EZIDS { get; set; }

        public DataTable GetEZIDs()
        {
            var dt = new DataTable("EZIDs");
            dt.Columns.Add("EZID", typeof(int));
            dt.Columns.Add("EntityTypeCode", typeof(string));
            foreach (var item in EZIDS)
            {
                var dr = dt.NewRow();
                dr["EZID"] = item;
                dr["EntityTypeCode"] = "TRI";
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }

}
