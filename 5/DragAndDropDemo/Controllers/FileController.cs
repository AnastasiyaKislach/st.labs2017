using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace DragAndDropDemo.Controllers {
	public class FileController : ApiController {

		public IHttpActionResult Get() {
			return Ok("OK");
		}

		[HttpPost]
		public IHttpActionResult Post() {
			if (HttpContext.Current.Request.Files.AllKeys.Any()) {
				var httpPostedFile = HttpContext.Current.Request.Files["Images"];

				if (httpPostedFile != null) {
					var fileSavePath = Path.Combine(HttpContext.Current.Server.MapPath("~/Images"), httpPostedFile.FileName);
					httpPostedFile.SaveAs(fileSavePath);

					return Ok("Файл загружен!");
				}
			}
			return Ok("Ничего не пришло!");
		}
	}
}
