﻿namespace FilmGallery.Models {
	public class RatingViewModel {
		public int Id { get; set; }

		public int FilmId { get; set; }

		public string UserId { get; set; }

		public int Rate { get; set; }

		public RatingViewModel() {

		}

		public RatingViewModel(RatingViewModel rating){
			Id = rating.Id;
			FilmId = rating.FilmId;
			Rate = rating.Rate;
		}
	}
}