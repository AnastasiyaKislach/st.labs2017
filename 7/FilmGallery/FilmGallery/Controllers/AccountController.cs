using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using FilmGallery.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

namespace FilmGallery.Controllers
{
    public class AccountController : Controller
    {
		private ApplicationUserManager _userManager;
		private ApplicationSignInManager _signInManager;


		public AccountController() {
		}

		public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager) {
			UserManager = userManager;
			SignInManager = signInManager;
		}
		
		public ActionResult GetCurrentUserName(){
			string userName = User.Identity.Name;
			return Json(userName, JsonRequestBehavior.AllowGet);
		}

		[AllowAnonymous]
		public ActionResult Login() {
			return View();
		}

		[HttpPost]
		[AllowAnonymous]
		[ValidateAntiForgeryToken]
		public async Task<ActionResult> Login(LoginViewModel details) {
			ApplicationUser user = await UserManager.FindAsync(details.Email, details.Password);

			if (user == null) {
				ModelState.AddModelError("", "Некорректное имя или пароль.");
			} else {
				ClaimsIdentity identity = await UserManager.CreateIdentityAsync(user,
					DefaultAuthenticationTypes.ApplicationCookie);

				AuthenticationManager.SignOut();
				AuthenticationManager.SignIn(new AuthenticationProperties {
					IsPersistent = false
				}, identity);
				return RedirectToAction("Index", "Home");
			}

			return View(details);
		}

		public ActionResult Register() {
		    return View();
	    }


	    [HttpPost]
	    public async Task<ActionResult> Register(RegisterViewModel model) {
		    if (ModelState.IsValid) {
			    ApplicationUser user = new ApplicationUser { UserName = model.Email, Email = model.Email };
			    IdentityResult result = await UserManager.CreateAsync(user, model.Password);

			    if (result.Succeeded) {
					await SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
					return RedirectToAction("Index", "Home");
			    }
			    AddErrors(result);
		    }
		    return View(model);
	    }

		//
		// POST: /Account/LogOff
		//[HttpPost]
		//[ValidateAntiForgeryToken]
		public ActionResult LogOff() {
			AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
			return RedirectToAction("Login");
		}

		public ApplicationUserManager UserManager {
		    get {
			    return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
		    }
		    private set {
			    _userManager = value;
		    }
	    }

		public ApplicationSignInManager SignInManager {
			get {
				return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
			}
			private set {
				_signInManager = value;
			}
		}

		private void AddErrors(IdentityResult result) {
		    foreach (var error in result.Errors) {
			    ModelState.AddModelError("", error);
		    }
	    }

	    private IAuthenticationManager AuthenticationManager {
		    get {
			    return HttpContext.GetOwinContext().Authentication;
		    }
	    }

	}
}