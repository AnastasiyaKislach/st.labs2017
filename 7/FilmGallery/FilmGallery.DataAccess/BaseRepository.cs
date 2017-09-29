using System.Data.Entity;
using System.Linq;
using FilmGallery.DataAccess.Contracts;

namespace FilmGallery.DataAccess {
	public class BaseRepository<T> : IRepository<T> where T : class {
		private DbContext dbContext;
		protected readonly DbSet<T> Items;

		public BaseRepository(DbContext context) {
			dbContext = context;
			Items = context.Set<T>();
		}

		public virtual T Create(T item) {
			Items.Add(item);
			return item;
		}

		public virtual T Update(T item) {
			dbContext.Entry(item).State = EntityState.Modified;
			return item;
		}

		public virtual T Delete(int id) {
			T item = Items.Find(id);
			if (item != null) {
				Items.Remove(item);
			}
			return item;
		}
		public virtual T GetById(object id) {
			return Items.Find(id);
		}

		public virtual IQueryable<T> GetAll() {
			return Items;
		}
	}
}