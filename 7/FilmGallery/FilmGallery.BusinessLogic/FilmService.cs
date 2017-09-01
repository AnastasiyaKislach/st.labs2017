using System.Linq;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class FilmService : DataService<Film>, IFilmService{
		private IUnitOfWork uow;

		public FilmService(IUnitOfWork uoWork)
			: base(uoWork) {
			this.uow = uoWork;
		}

		public Film GetByName(string name){
			return uow.Films.GetAll().FirstOrDefault(i => i.Name.ToLower() == name.ToLower());
		}
	}
}
