using System.Collections.Generic;
using System.Data;

namespace Enza.Crossing.Entities.BDTOs.Args
{
    public class CreateCrossingRequestArgs
    {
        public List<TVPCrossing> TVPCrossing { get; set; }
        public string CC { get; set; }
        public string Module { get; set; }
        public string User { get; set; }

        public DataTable GetDataTable()
        {
            var dt = new DataTable("TempTableCrossing");
            dt.Columns.Add("EZID", typeof(int));
            dt.Columns.Add("Sex", typeof(string));
            dt.Columns.Add("Name", typeof(string));
            foreach (var item in TVPCrossing)
            {
                var dr = dt.NewRow();
                dr["EZID"] = item.EZID;
                dr["Sex"] = item.Sex;
                dr["Name"] = item.Name;
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
    public class TVPCrossing
    {
        public int EZID { get; set; }
        public string Name { get; set; }
        public string Sex { get; set; }
        
    }
}
