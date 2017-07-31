using System.Web.Http;
using Enza.DataAccess;
using Enza.DataAccess.Databases;
using Enza.DataAccess.Interfaces;
using Enza.Patterns.Unity;
using Enza.Patterns.Unity.Extensions;
using Microsoft.Practices.Unity;

namespace Enza.Services.Crossing
{
    /// <summary>
    /// 
    /// </summary>
    public class UnityConfig
    {
        /// <summary>
        /// 
        /// </summary>
        /// <param name="config"></param>
        public static void RegisterComponents(HttpConfiguration config)
        {
            var container = new UnityContainer();
            container.RegisterType<IUserContext, UserContext>(new HierarchicalLifetimeManager());
            container.RegisterType<IAdminDatabase, AdminDatabase>(new HierarchicalLifetimeManager());
            container.RegisterType<IAnalysisDatabase, AnalysisDatabase>(new HierarchicalLifetimeManager());
            container.RegisterModule(new Enza.Crossing.BusinessAccess.UnityModule());
            config.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}