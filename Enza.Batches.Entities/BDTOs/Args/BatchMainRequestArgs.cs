using Enza.Common.Args.Abstract;
using System.Collections.Generic;
using System.Data;

namespace Enza.Batches.Entities.BDTOs.Args
{
    public class BatchMainRequestArgs
    {
        public string CC { get; set; }
        public List<TVPBatch> TVPBatch { get; set; }
        public DataTable GetDataTable()
        {
            var dt = new DataTable("TVP_CreateTempData");
            dt.Columns.Add("EZID", typeof(int));
            dt.Columns.Add("EntityTypeCode", typeof(string));
            dt.Columns.Add("Name", typeof(int));
            dt.Columns.Add("delete", typeof(bool));
            foreach (var item in TVPBatch)
            {
                var dr = dt.NewRow();
                dr["EZID"] = item.EZID;
                dr["EntityTypeCode"] = item.ETC;
                dt.Rows.Add(dr);
            }
            return dt;
        }

    }
    public class TVPBatch
    {
        public int EZID { get; set; }
        public string ETC { get; set; }
    }
}
