using Enza.Common.Args.Abstract;
using System.Collections.Generic;
using System.Data;

namespace Enza.Generals.Entities.BDTOs.Args
{
    public class CreateTempRequestArgs : RequestArgs
    {
        public List<TvpCreateTempData> TempData { get; set; }
        public string CC { get; set; }
        public string  Module { get; set; }
        public string User { get; set; }
        public bool GetCount { get; set; }

        public DataTable GetTempTable()
        {
            var dt = new DataTable("TempTableCreate");
            dt.Columns.Add("EZID", typeof (int));
            dt.Columns.Add("EntityTypeCode", typeof (string));
            dt.Columns.Add("Name", typeof(string));
            dt.Columns.Add("delete", typeof(bool));
            foreach (var item in TempData)
            {
                var dr = dt.NewRow();
                dr["EZID"] = item.EZID;
                dr["EntityTypeCode"] = item.ETC;
                dr["Name"] = item.Name;
                dr["delete"] = item.delete;
                dt.Rows.Add(dr);
            }
            return dt;
        }


    }

}
