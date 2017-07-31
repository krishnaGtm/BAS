using System.Web.Http;
using Enza.DataAccess.Databases;
using Enza.DataAccess.Interfaces;
using Enza.Patterns.Unity;
using Enza.Patterns.Unity.Extensions;
using Microsoft.Practices.Unity;

namespace Enza.Services.Trial
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
            container.RegisterType<IAdminDatabase, AdminDatabase>(new HierarchicalLifetimeManager());
            container.RegisterType<IAnalysisDatabase, AnalysisDatabase>(new HierarchicalLifetimeManager());
            container.RegisterModule(new Enza.Trial.BusinessAccess.UnityModule());

            config.DependencyResolver = new UnityDependencyResolver(container);
        }
    }
}