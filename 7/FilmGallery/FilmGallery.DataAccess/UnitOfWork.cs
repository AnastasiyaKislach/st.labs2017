using System;
using System.Linq;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.DataAccess {
	public class UnitOfWork : IUnitOfWork{
		private readonly FilmGalleryContext context;
		private IRepository<Film> _films;
		private IRepository<Comment> _comments;
		private IRepository<Rating> _ratings;
		private IRepository<Image> _images;

		private bool disposed;
		public UnitOfWork(string connectionString) {
			context = new FilmGalleryContext(connectionString);
		}
		public IRepository<Film> Films {
			get {
				return _films ?? (_films = new BaseRepository<Film>(context));
			}
		}

		public IRepository<Comment> Comments {
			get {
				return _comments ?? (_comments = new BaseRepository<Comment>(context));
			}
		}
		public IRepository<Rating> Ratings {
			get {
				return _ratings ?? (_ratings = new BaseRepository<Rating>(context));
			}
		}
		
		public IRepository<Image> Images {
			get {
				return _images ?? (_images = new BaseRepository<Image>(context));
			}
		}
		public virtual IRepository<T> GetRepository<T>() where T : class
		{
			var property = GetType().GetProperties().FirstOrDefault(i => i.PropertyType == typeof(IRepository<T>));

			return (IRepository<T>)property.GetValue(this);
		}
	
		public void Dispose() {
			Dispose(true);
			GC.SuppressFinalize(this);
		}
		public virtual void Dispose(bool disposing) {
			if (!disposed) {
				if (disposing) {
					context.Dispose();
				}
				disposed = true;
			}
		}

		public static UnitOfWork Create() {
			return new UnitOfWork("DBConnection");
		}
	}
}