using FilmGallery.BusinessLogic.Contracts;
using FilmGallery.DataAccess.Contracts;
using FilmGallery.Entities;

namespace FilmGallery.BusinessLogic {
	public class CommentService: DataService<Comment>, ICommentService {
		private IUnitOfWork uow;

		public CommentService(IUnitOfWork uoWork)
			: base(uoWork) {
			this.uow = uoWork;
		}
	}
}
