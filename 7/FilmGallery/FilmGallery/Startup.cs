using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(FilmGallery.Startup))]
namespace FilmGallery {
	public partial class Startup {
		public void Configuration(IAppBuilder app) {
			ConfigureAuth(app);
		}
	}
}
