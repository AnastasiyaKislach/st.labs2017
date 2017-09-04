using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.Entities;
using FilmGallery.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;

namespace FilmGallery.Controllers {
	public class FilmController : Controller {
		private IFilmService filmService;
		private IRatingService ratingService;

		public FilmController(IFilmService filmService, IRatingService ratingService) {
			this.filmService = filmService;
			this.ratingService = ratingService;
		}

		public ActionResult Index() {
			List<FilmViewModel> films = filmService.GetAll().ToList().Select(ToFilmViewModel).ToList();
			var a = Json(films, JsonRequestBehavior.AllowGet);

			return Json(films, JsonRequestBehavior.AllowGet);
		}
		
		public ActionResult Details(int id) {
			Film film = filmService.GetById(id); 
			return Json(film, JsonRequestBehavior.AllowGet);
		}

		public ActionResult GetByName(string name) {
			Film film = filmService.GetByName(name);
			if (film != null){
				FilmViewModel vm = ToFilmViewModel(film);
				return Json(vm, JsonRequestBehavior.AllowGet);
			}
			return Json(film, JsonRequestBehavior.AllowGet);
		}

		private FilmViewModel ToFilmViewModel(Film model) {
			FilmViewModel vm = new FilmViewModel(model);
			vm.Comments = model.Comments.Select(ToCommentViewModel).ToList();
			vm.Images = model.Images.Select(ToImageViewModel).ToList();
			vm.Rating = ratingService.GetFilmRating(model.Id);
			return vm;
		}
		
		private CommentViewModel ToCommentViewModel(Comment model) {
			CommentViewModel vm = new CommentViewModel(model);
			vm.UserName = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(model.UserId).UserName;
			vm.Date = model.Date.ToString();
			return vm;
		}

		private ImageViewModel ToImageViewModel(Image model) {
			ImageViewModel vm = new ImageViewModel{
				Url = model.Url
			};
			return vm;
		}
		
	}
}
