using System;
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
	public class CommentController : Controller {
		private ICommentService commentService;

		public CommentController(ICommentService commentService) {
			this.commentService = commentService;
		}

		public ActionResult GetFilmComments(int filmId) {
			List<CommentViewModel> comments = commentService.GetAll().Where(i => i.FilmId == filmId).Select(ToViewModel).ToList();
			return Json(comments, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Create(CommentViewModel viewModel) {
			Comment createdComment = commentService.Add(ToModel(viewModel));
			CommentViewModel vm = ToViewModel(createdComment);
			return Json(vm, JsonRequestBehavior.AllowGet);
		}

		private Comment ToModel(CommentViewModel viewModel) {
			Comment comment = new Comment {
				Date = DateTime.Now,
				FilmId = viewModel.FilmId,
				Text = viewModel.Text,
				UserId = User.Identity.GetUserId()
			};
			return comment;
		}
		private CommentViewModel ToViewModel(Comment model) {
			CommentViewModel vm = new CommentViewModel {
				Id = model.Id,
				Date = model.Date.ToString(),
				FilmId = model.FilmId,
				Text = model.Text,
				UserId = User.Identity.GetUserId(),
				UserName = HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>().FindById(model.UserId).UserName
			};
			return vm;
		}
	}
}