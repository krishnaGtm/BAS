using System.Collections.Generic;
using System.Data;

namespace Enza.Common.Comparers
{
    public class DataColumnComparer : IEqualityComparer<DataColumn>
    {
        public bool Equals(DataColumn x, DataColumn y)
        {
            return string.CompareOrdinal(x.ColumnName, y.ColumnName) == 0;
        }

        public int GetHashCode(DataColumn obj)
        {
            return obj.ColumnName.GetHashCode();
        }
    }
}
