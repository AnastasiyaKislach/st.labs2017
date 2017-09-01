using System;
using FilmGallery.Entities;

namespace FilmGallery.DataAccess.Contracts {
	public interface IUnitOfWork : IDisposable {
		IRepository<Film> Films { get; }
		IRepository<Comment> Comments { get; }
		IRepository<Rating> Ratings { get; }
		IRepository<Image> Images { get; }
		IRepository<T> GetRepository<T>() where T : class;
	}
}
