using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FilmGallery.DataAccess;
using Ninject.Modules;

namespace FilmGallery.DependencyResolver {
	public class DbContextModule : NinjectModule {
		public override void Load() {
			Bind<FilmGalleryContext>();
		}
	}
}