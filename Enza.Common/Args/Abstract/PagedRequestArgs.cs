using System.Collections.Generic;
using System.Data;

namespace Enza.Common.Args.Abstract
{
    public abstract class PagedRequestArgs : RequestArgs
    {
        protected PagedRequestArgs()
        {
            F = new List<TvpFilter>();
            S = new List<TvpSort>();
        }

        public int PS { get; set; }
        public int PN { get; set; }
        public string SC { get; set; }
        public string SO { get; set; }
        public int Total { get; set; }

        public List<TvpFilter> F { get; set; }
        public List<TvpSort> S { get; set; }

        public DataTable GetFilters()
        {
            var dt = new DataTable("Filters");
            dt.Columns.Add("FieldName", typeof (string));
            dt.Columns.Add("FieldType", typeof (string));
            dt.Columns.Add("FieldValue", typeof (string));
            dt.Columns.Add("Expression", typeof (string));
            dt.Columns.Add("Operator", typeof (string));
            foreach (var item in F)
            {
                var dr = dt.NewRow();
                dr["FieldName"] = item.Fn;
                dr["FieldType"] = item.Ft;
                dr["FieldValue"] = item.Fv;
                dr["Expression"] = item.Ex;
                dr["Operator"] = item.Op;
                dt.Rows.Add(dr);
            }
            return dt;
        }
        public DataTable GetSorts()
        {
            var dt = new DataTable("Sorts");
            dt.Columns.Add("SortColumn", typeof (string));
            dt.Columns.Add("SortOrder", typeof (string));
            foreach (var item in S)
            {
                var dr = dt.NewRow();
                dr["SortColumn"] = item.SC;
                dr["SortOrder"] = item.SO;
                dt.Rows.Add(dr);
            }
            return dt;
        }
    }
}
