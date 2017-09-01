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

		public int GetRating(int filmId) {
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
