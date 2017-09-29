using System.Linq;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class FilmService : DataService<Film>, IFilmService{

		public FilmService(IUnitOfWork uoWork)
			: base(uoWork) {
		}

		public Film GetByName(string name){
			return GetAll().FirstOrDefault(i => i.Name.ToLower() == name.ToLower());
		}
	}
}
