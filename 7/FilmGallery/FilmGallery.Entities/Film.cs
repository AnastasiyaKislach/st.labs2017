using System.Collections.Generic;

namespace FilmGallery.Entities {
	public class Film {
		public int Id { get; set; }

		public string Name { get; set; }

		public string Description { get; set; }

		public string Poster { get; set; }

		public virtual List<Comment> Comments { get; set; }

		public virtual List<Rating> Ratings { get; set; }

		public virtual List<Image> Images { get; set; }

		public Film() {
			Comments = new List<Comment>();
			Ratings = new List<Rating>();
			Images = new List<Image>();
		}
	}
}
