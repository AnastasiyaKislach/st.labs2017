using System.Collections.Generic;
using FilmGallery.Entities;

namespace FilmGallery.Models {
	public class FilmViewModel {
		public int Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public string Poster { get; set; }

		public int Rating { get; set; }

		public virtual List<CommentViewModel> Comments { get; set; }
		
		public virtual List<ImageViewModel> Images { get; set; }

		public FilmViewModel() {
			Comments = new List<CommentViewModel>();
			Images = new List<ImageViewModel>();
		}
		public FilmViewModel(Film film) : this(){
			Id = film.Id;
			Name = film.Name;
			Description = film.Description;
			Poster = film.Poster;
		}
	}
}