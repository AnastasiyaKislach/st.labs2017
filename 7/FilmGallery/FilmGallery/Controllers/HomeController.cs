using System.Collections.Generic;
using System.Web.Mvc;

namespace FilmGallery.Controllers {
	public class HomeController : Controller {
		[Authorize]
		public ActionResult Index() {
			return View("Index");
		}
	}
}