namespace FilmGallery.Entities {
	public class Rating {
		public int Id { get; set; }

		public int FilmId { get; set; }

		public string UserId { get; set; }

		public int Rate { get; set; }
	}
}
