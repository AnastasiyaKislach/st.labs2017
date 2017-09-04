using System;
using System.Collections.Generic;
using System.Linq;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class RatingService : DataService<Rating>, IRatingService {
		private IUnitOfWork uow;

		public RatingService(IUnitOfWork uoWork)
			: base(uoWork) {
			this.uow = uoWork;
		}

		public int ChangeRating(Rating rating) {
			Rating foundRating = uow.Ratings.GetAll().FirstOrDefault(i => i.FilmId == rating.FilmId && i.UserId == rating.UserId);

			int ratingValue = 0;

			if (foundRating == null) {
				uow.Ratings.Create(rating);
			} else {
				foundRating.Rate = rating.Rate;
				uow.Ratings.Update(foundRating);
			}
			ratingValue = CalcFilmRating(rating.FilmId);
			return ratingValue;
		}

		public int GetFilmRating(int filmId) {
			return CalcFilmRating(filmId);
		}

		private int CalcFilmRating(int filmId) {
			List<Rating> ratings = uow.Ratings.GetAll().Where(i => i.FilmId == filmId).ToList();

			if (ratings.Count <= 0) {
				return 0;
			}

			int rating = 0;

			foreach (var rate in ratings) {
				rating += rate.Rate;
			}
			rating /= ratings.Count;

			return rating;
		}
	}
}
