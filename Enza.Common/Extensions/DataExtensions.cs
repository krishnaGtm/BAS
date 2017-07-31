using System.Data;
using System.Data.Common;
using System.Linq;

namespace Enza.Common.Extensions
{
    public static class DataExtensions
    {
        public static T Get<T>(this DbDataReader reader, int column)
        {
            if (reader.IsDBNull(column)) return default(T);
            return (T) reader.GetValue(column);
        }

        public static DataTable Join(this DataTable table1, DataTable table2, string[] keys)
        {
            var commonColumns = table1.Columns.OfType<DataColumn>().Where(o => keys.Contains(o.ColumnName)).ToArray();
            var result = new DataTable("Table1");
            table1.PrimaryKey = commonColumns.ToArray();

            result.Merge(table1, false, MissingSchemaAction.Add);
            result.Merge(table2, false, MissingSchemaAction.Add);
            return result;
        }

        public static DataTable LeftJoin(this DataTable table1, DataTable table2, string key)
        {
            var rs = table1.Clone();
            foreach (DataColumn dc in table2.Columns)
            {
                var colName = dc.ColumnName;
                if (rs.Columns.Contains(dc.ColumnName))
                {
                    colName = string.Concat(colName, dc.Ordinal);
                }
                rs.Columns.Add(colName, dc.DataType);
            }
            var rows = from Leftrow in table1.AsEnumerable()
                       join Rightrow in table2.AsEnumerable() on Leftrow[key] equals Rightrow[key] into temp
                       from r in temp.DefaultIfEmpty()
                       select Leftrow.ItemArray.Concat(r?.ItemArray ?? table2.NewRow().ItemArray).ToArray();

            foreach (var values in rows)
                rs.Rows.Add(values);
            return rs;
        }
    }
}
