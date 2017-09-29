using System.Linq;

namespace FilmGallery.DataAccess.Contracts {
	public interface IRepository<T> where T : class {
		T Create(T item); 
		T Update(T item); 
		T Delete(int id); 
		T GetById(object id); 
		IQueryable<T> GetAll();
	}
}
