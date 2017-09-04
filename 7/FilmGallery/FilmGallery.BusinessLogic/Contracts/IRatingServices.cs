using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic.Contracts {
	public interface IRatingService : IDataService<Rating> {
		int GetFilmRating(int filmId);
		int ChangeRating(Rating rating);
	}
}
