using System;
using System.Linq;
using System.Linq.Expressions;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;

namespace FilmGallery.BusinessLogic {
	public class DataService<T> : IDataService<T> where T : class {

		private IRepository<T> repository;
		private bool disposed;

		protected readonly IUnitOfWork uow;

		public DataService(IUnitOfWork uow) {
			this.uow = uow;
			repository = uow.GetRepository<T>();
		}
		public T Add(T item) {
			T newItem = repository.Create(item);
			uow.Save();
			return newItem;
		}

		public IQueryable<T> GetAll() {
			return repository.GetAll();
		}

		public T GetById(int id) {
			return repository.GetById(id);
		}

		public T Update(T item) {
			T updatedItem = repository.Update(item);
			uow.Save();
			return updatedItem;
		}

		public T Delete(int id) {
			T deletedItem = repository.Delete(id);
			uow.Save();
			return deletedItem;
		}

		public void Dispose() {
			Dispose(true);
			GC.SuppressFinalize(this);
		}

		protected virtual void Dispose(bool disposing) {
			if (!disposed) {
				if (disposing) {
					uow.Dispose();
				}
				disposed = true;
			}
		}
	}
}
