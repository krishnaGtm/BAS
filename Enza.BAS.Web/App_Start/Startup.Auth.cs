using Owin;

namespace Enza.BAS.Web
{
    public partial class Startup
    {
        // For more information on configuring authentication, please visit http://go.microsoft.com/fwlink/?LinkId=301864
        public void ConfigureAuth(IAppBuilder app)
        {
            //We don't need these configuration since we have used windows authentication

            //var sessionSection = (SessionStateSection) WebConfigurationManager.GetSection("system.web/sessionState");
            //// Enable the application to use a cookie to store information for the signed in user
            //app.UseCookieAuthentication(new CookieAuthenticationOptions
            //{
            //    AuthenticationType = DefaultAuthenticationTypes.ApplicationCookie,
            //    LoginPath = new PathString("/Account/Login"),
            //    ExpireTimeSpan = sessionSection.Timeout,
            //    SlidingExpiration = true
            //});
        }
    }
}