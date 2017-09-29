using FilmGallery.DataAccess;
using FilmGallery.DataAccess.Contracts;
using Ninject.Modules;

namespace FilmGallery.DependencyResolver {
	public class DataAccessModule : NinjectModule {
		private readonly string connectionString;

		public DataAccessModule(string connectionString) {
			this.connectionString = connectionString;
		}

		public override void Load() {
			Bind<IUnitOfWork>()
				.To<UnitOfWork>()
				.WithConstructorArgument(connectionString);
		}
	}
}
