using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class ImageService: DataService<Image>, IImageService {

		public ImageService(IUnitOfWork uoWork)
			: base(uoWork) {
		}
	}
}
