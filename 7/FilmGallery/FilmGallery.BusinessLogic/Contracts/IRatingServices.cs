using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic.Contracts {
	public interface IRatingService : IDataService<Rating> {
		int GetRating(int filmId);
	}
}
