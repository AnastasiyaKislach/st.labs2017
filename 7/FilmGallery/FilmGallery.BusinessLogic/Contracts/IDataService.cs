using System;
using System.Linq;

namespace FilmGallery.BusinessLogic.Contracts
{
    public interface IDataService<T> : IDisposable {
	    T Add(T item);
	    IQueryable<T> GetAll();
	    T GetById(int id);
	    T Edit(T item);
	    T Delete(int id);
    }
}
