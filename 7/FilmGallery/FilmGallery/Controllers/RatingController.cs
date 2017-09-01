using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.Entities;
using FilmGallery.Models;
using Microsoft.AspNet.Identity;

namespace FilmGallery.Controllers
{
    public class RatingController : Controller
    {
		private IRatingService ratingService;

		public RatingController(IRatingService ratingService) {
			this.ratingService = ratingService;
		}

		public ActionResult GetFilmComments(int filmId) {
			List<Rating> ratings = ratingService.GetAll().Where(i => i.FilmId == filmId).ToList();
			return Json(ratings, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Create(RatingViewModel viewModel) {
			Rating createdRating = ratingService.Add(ToModel(viewModel));
			return Json(createdRating, JsonRequestBehavior.AllowGet);
		}

		private Rating ToModel(RatingViewModel viewModel) {
			Rating rating = new Rating {
				FilmId = viewModel.FilmId,
				Rate = viewModel.Rate,
				UserId = User.Identity.GetUserId()
			};
			return rating;
		}
	}
}