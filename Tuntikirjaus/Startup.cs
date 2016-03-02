using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(Tuntikirjaus.Startup))]
namespace Tuntikirjaus
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
