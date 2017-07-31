using System.Security.Claims;
using Enza.DataAccess.Interfaces;

namespace Enza.DataAccess
{
    public class UserContext : IUserContext
    {
        public string Name { get; set; }

        public IUserContext GetContext()
        {
            var user = System.Threading.Thread.CurrentPrincipal as ClaimsPrincipal;
            if (user != null)
            {
                Name = user.Identity.Name;
                return this;
            }
            return null;
        }
    }
}
