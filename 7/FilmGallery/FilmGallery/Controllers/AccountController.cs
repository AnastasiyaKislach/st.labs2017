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

		public AccountController() {
		}

		public AccountController(ApplicationUserManager userManager) {
			UserManager = userManager;

		}

		public ActionResult Index() {
		    return View(UserManager.Users);
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
				    return RedirectToAction("Index");
			    } else {
				    AddErrors(result);
			    }
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


		public async Task<ActionResult> Edit(string id) {
			ApplicationUser user = await UserManager.FindByIdAsync(id);
			if (user != null) {
				return View(user);
			} else {
				return RedirectToAction("Index");
			}
		}

		[HttpPost]
		public async Task<ActionResult> Edit(string id, string email, string password) {
			ApplicationUser user = await UserManager.FindByIdAsync(id);
			if (user != null) {
				user.Email = email;
				IdentityResult validEmail
					= await UserManager.UserValidator.ValidateAsync(user);

				if (!validEmail.Succeeded) {
					AddErrors(validEmail);
				}

				IdentityResult validPass = null;
				if (password != string.Empty) {
					validPass = await UserManager.PasswordValidator.ValidateAsync(password);

					if (validPass.Succeeded) {
						user.PasswordHash =
							UserManager.PasswordHasher.HashPassword(password);
					} else {
						AddErrors(validPass);
					}
				}

				if ((validEmail.Succeeded && validPass == null) ||
						(validEmail.Succeeded && password != string.Empty && validPass.Succeeded)) {
					IdentityResult result = await UserManager.UpdateAsync(user);
					if (result.Succeeded) {
						return RedirectToAction("Index");
					} else {
						AddErrors(result);
					}
				}
			} else {
				ModelState.AddModelError("", "Пользователь не найден");
			}
			return View(user);
		}

		[HttpPost]
		public async Task<ActionResult> Delete(string id) {
			ApplicationUser user = await UserManager.FindByIdAsync(id);

			if (user != null) {
				IdentityResult result = await UserManager.DeleteAsync(user);
				if (result.Succeeded) {
					return RedirectToAction("Index");
				} else {
					return View("Error", result.Errors);
				}
			} else {
				return View("Error", new string[] { "Пользователь не найден" });
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