using System.Data.Common;
using System.Data.SqlClient;
using Enza.DataAccess.Abstracts;
using Enza.DataAccess.Interfaces;

namespace Enza.DataAccess.Databases
{
    /// <summary>
    /// Used to connect SQL Server Specific database connection and it's operations.
    /// </summary>
    public class SqlDatabase : Database, ISqlDatabase
    {
        /// <summary>
        /// Initializes a new instance of the <see cref="SqlDatabase"/> class.
        /// </summary>
        /// <param name="nameOrConnectionString">The name or connection string.</param>
        public SqlDatabase(string nameOrConnectionString)
            : base(nameOrConnectionString)
        {

        }

        /// <summary>
        /// Gets the name of the provider.
        /// </summary>
        /// <value>
        /// The name of the provider.
        /// </value>
        protected override string ProviderName => "System.Data.SqlClient";

        /// <summary>
        /// Creates the data adapter. Must be overriden by the derived class
        /// </summary>
        /// <param name="cmd">The command.</param>
        /// <returns></returns>
        protected override DbDataAdapter CreateDataAdapter(DbCommand cmd)
        {
            return new SqlDataAdapter(cmd as SqlCommand);
        }
    }
}
