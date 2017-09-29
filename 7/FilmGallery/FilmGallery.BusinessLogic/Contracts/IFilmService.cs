using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic.Contracts {
	public interface IFilmService: IDataService<Film>
	{
		Film GetByName(string name);
	}
}
