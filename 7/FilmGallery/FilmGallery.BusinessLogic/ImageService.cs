using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class ImageService: DataService<Image>, IImageService {
		private IUnitOfWork uow;

		public ImageService(IUnitOfWork uoWork)
			: base(uoWork) {
			this.uow = uoWork;
		}
	}
}
