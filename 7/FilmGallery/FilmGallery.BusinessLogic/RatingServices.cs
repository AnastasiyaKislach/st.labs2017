using System.Linq;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class RatingService : DataService<Rating>, IRatingService {
	
		public RatingService(IUnitOfWork uoWork)
			: base(uoWork) {
		}

		public int ChangeRating(Rating rating) {
			Rating foundRating = GetAll().FirstOrDefault(i => i.FilmId == rating.FilmId && i.UserId == rating.UserId);

			int ratingValue = 0;

			if (foundRating == null) {
				Add(rating);
			} else {
				foundRating.Rate = rating.Rate;
				Update(foundRating);
			}
			ratingValue = CalcFilmRating(rating.FilmId);
			return ratingValue;
		}

		public int GetFilmRating(int filmId) {
			return CalcFilmRating(filmId);
		}

		private int CalcFilmRating(int filmId) {
			double rating = GetAll().Where(i => i.FilmId == filmId).Average(i=>i.Rate);

			return (int)rating;
		}
	}
}
