using System;
using System.Linq;
using System.Linq.Expressions;

namespace FilmGallery.BusinessLogic.Contracts
{
    public interface IDataService<T> : IDisposable {
	    T Add(T item);
	    IQueryable<T> GetAll();
	    T GetById(int id);
	    T Update(T item);
	    T Delete(int id);
    }
}
