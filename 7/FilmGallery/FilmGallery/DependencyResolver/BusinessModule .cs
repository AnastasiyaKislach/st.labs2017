using FilmGallery.BusinessLogic;
using FilmGallery.BusinessLogic.Contracts;
using Ninject.Modules;

namespace FilmGallery.DependencyResolver
{
    public class BusinessModule : NinjectModule {
	    public override void Load() {
		    Bind<IFilmService>().To<FilmService>();
		    Bind<ICommentService>().To<CommentService>();
		    Bind<IRatingService>().To<RatingService>();
		    Bind<IImageService>().To<ImageService>();
	    }
    }
}
