using System;
using System.Data.Common;
using Enza.DataAccess.Abstracts;
using MongoDB.Driver;
using System.Configuration;
using Enza.DataAccess.Interfaces;
using MongoDB.Bson;
using System.Threading.Tasks;

namespace Enza.DataAccess.Databases
{
    
    /// <summary>
    /// Used to connect MongoDb Specific database connection and it's operations.
    /// </summary>
    public class MongoDatabase : Database, IMongoDbDatabase
    {
        bool disposed;
        string conString;
        protected IMongoClient client;
        protected IMongoDatabase db;
        public MongoDatabase(string nameOrConnectionString)
        {
            conString = nameOrConnectionString;
            var settings = ConfigurationManager.ConnectionStrings[nameOrConnectionString];
            if (settings != null)
            {
                conString = settings.ConnectionString;
            }
            var url = new MongoUrl(conString);
            client = new MongoClient(url);
            db = client.GetDatabase(url.DatabaseName);
        }

        public override async Task<string> ExecuteAsync(string queryAsJson)
        {
            var rs = await db.RunCommandAsync((Command<BsonDocument>)queryAsJson);
            return rs.ToString();
        }


        protected override string ProviderName
        {
            get { return "MongoDb"; }
        }
        protected override DbDataAdapter CreateDataAdapter(DbCommand cmd)
        {
            throw new NotImplementedException();
        }
        protected override void Dispose(bool disposing)
        {
            if (disposed) return;
            if (disposing)
            {
                client = null;
                db = null;
            }
            disposed = true;
        }

    }
}
