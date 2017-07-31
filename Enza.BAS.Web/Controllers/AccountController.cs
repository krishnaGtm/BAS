using System;
using System.Web;
using System.Web.Mvc;

namespace Enza.BAS.Web.Controllers
{
    public class AccountController : BaseController
    {
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public ActionResult LogOut()
        {
            var cookie = Request.Cookies["TSWA-Last-User"];
            if (User.Identity.IsAuthenticated == false || cookie == null || StringComparer.OrdinalIgnoreCase.Equals(User.Identity.Name, cookie.Value))
            {
                string name = string.Empty;
                if (Request.IsAuthenticated)
                {
                    name = User.Identity.Name;
                }
                cookie = new HttpCookie("TSWA-Last-User", name);
                Response.Cookies.Set(cookie);

                Response.AppendHeader("Connection", "close");
                Response.StatusCode = 401; // Unauthorized;
                Response.Clear();
                //should probably do a redirect here to the unauthorized/failed login page
                //if you know how to do this, please tap it on the comments below
                Response.Write("Unauthorized. Reload the page to try again...");
                Response.End();

                return RedirectToAction("Index", "Home");
            }
            cookie = new HttpCookie("TSWA-Last-User", string.Empty)
            {
                Expires = DateTime.Now.AddYears(-5)
            };
            Response.Cookies.Set(cookie);

            return RedirectToAction("Index", "Home");
        }
    }
}