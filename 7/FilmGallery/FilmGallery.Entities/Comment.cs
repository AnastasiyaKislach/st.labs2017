using System;

namespace FilmGallery.Entities {
	public class Comment {
		public int Id { get; set; }

		public string UserId { get; set; }

		public int FilmId { get; set; }

		public DateTime Date { get; set; }

		public string Text { get; set; }
	}
}
