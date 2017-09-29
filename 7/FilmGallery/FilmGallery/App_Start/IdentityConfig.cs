﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using FilmGallery.DataAccess;
using FilmGallery.Entities;
using FilmGallery.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin;
using Microsoft.Owin.Security;

namespace FilmGallery {
	public class ApplicationUserManager : UserManager<User> {
		public ApplicationUserManager(IUserStore<User> store)
			: base(store) {
		}

		public static ApplicationUserManager Create(IdentityFactoryOptions<ApplicationUserManager> options, IOwinContext context) {
			var manager = new ApplicationUserManager(new UserStore<User>(context.Get<FilmGalleryContext>()));
			
			manager.UserValidator = new UserValidator<User>(manager) {
				AllowOnlyAlphanumericUserNames = false,
				RequireUniqueEmail = true
			};

			manager.PasswordValidator = new PasswordValidator {
				RequiredLength = 3
				//RequireNonLetterOrDigit = true,
				//	RequireDigit = true,
				//	RequireLowercase = true,
				//	RequireUppercase = true,
			};

			// Configure user lockout defaults
			//manager.UserLockoutEnabledByDefault = true;
			//manager.DefaultAccountLockoutTimeSpan = TimeSpan.FromMinutes(5);
			//manager.MaxFailedAccessAttemptsBeforeLockout = 5;

			//var dataProtectionProvider = options.DataProtectionProvider;
			//if (dataProtectionProvider != null) {
			//	manager.UserTokenProvider =
			//		new DataProtectorTokenProvider<ApplicationUser>(dataProtectionProvider.Create("ASP.NET Identity"));
			//}

			return manager;
		}
	}


	public class ApplicationSignInManager : SignInManager<User, string> {
		public ApplicationSignInManager(ApplicationUserManager userManager, IAuthenticationManager authenticationManager)
			: base(userManager, authenticationManager) {
		}

		public override Task<ClaimsIdentity> CreateUserIdentityAsync(User user) {
			return user.GenerateUserIdentityAsync((ApplicationUserManager)UserManager);
		}

		public static ApplicationSignInManager Create(IdentityFactoryOptions<ApplicationSignInManager> options, IOwinContext context) {
			return new ApplicationSignInManager(context.GetUserManager<ApplicationUserManager>(), context.Authentication);
		}
	}
}