using System.Collections.Generic;
using System.Web.Mvc;

namespace FilmGallery.Controllers {
	public class HomeController : Controller {
		[Authorize]
		public ActionResult Index() {
			//Dictionary<string, object> data
			//	= new Dictionary<string, object>();
			//data.Add("Ключ", "Значение");

			//return View(data);
			return View("React");
		}
	}
}