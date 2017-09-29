using System;
using System.Collections.Generic;
using System.Web.Mvc;
using Ninject;
using Ninject.Modules;

namespace FilmGallery.DependencyResolver {
	public class NinjectDependencyResolver : IDependencyResolver {
		private IKernel kernel;

		public NinjectDependencyResolver(IKernel kernelParam) {
			kernel = kernelParam;
			AddBindings();
		}

		public object GetService(Type serviceType) {
			return kernel.TryGet(serviceType);
		}

		public IEnumerable<object> GetServices(Type serviceType) {
			return kernel.GetAll(serviceType);
		}

		private void AddBindings() {
			List<INinjectModule> modules = new List<INinjectModule> {
				new DataAccessModule("DBConnection"),
				new BusinessModule(),
				new DbContextModule()
			};

			kernel.Load(modules);
		}
	}
}