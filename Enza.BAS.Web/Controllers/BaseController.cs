using System;
using System.Web.Mvc;
using Enza.Common;
using Enza.Common.Cache;
using Enza.Common.Extensions;

namespace Enza.BAS.Web.Controllers
{
    [HandleError]
    [Authorize]
    public class BaseController : Controller
    {
        protected UserProfile UserContext
        {
            get
            {
                return MemCache.Get(User.Identity.Name, () =>
                {
                    try
                    {
                        //using (var serviceRegistryAPI = new ServiceRegistryAPI())
                        //{
                        //    var url = serviceRegistryAPI.GetServiceUrl(Microservices.USERS);
                        //    using (var accountService = new AccountServiceAPI(url))
                        //    {
                        //        return accountService.GetUserProfile();
                        //    }
                        //}
                        return new UserProfile
                        {
                            Name = User.Identity.Name
                        };
                    }
                    catch(Exception ex)
                    {
                        this.LogError(ex);
                        return null;
                    }
                });
            }
        }
        
        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            #region Handle Role & Menu

            ViewBag.UserContext = UserContext;

            #endregion

            base.OnActionExecuting(filterContext);
        }

        protected ActionResult ErrorResult(string error = "")
        {
            return View("Error", error);
        }
    }
}