﻿using System;
using System.Web.Http;
using System.Web.Optimization;
using System.Web.Routing;

namespace DragAndDropDemo {
	public class Global : System.Web.HttpApplication {

		protected void Application_Start(object sender, EventArgs e) {
			GlobalConfiguration.Configure(WebApiConfig.Register);
			RouteConfig.RegisterRoutes(RouteTable.Routes);
			BundleConfig.RegisterBundles(BundleTable.Bundles);
		}
	}
}