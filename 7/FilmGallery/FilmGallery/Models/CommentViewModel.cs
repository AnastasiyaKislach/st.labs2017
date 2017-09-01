using System;
using FilmGallery.Entities;

namespace FilmGallery.Models {
	public class CommentViewModel {
		public int Id { get; set; }

		public string UserId { get; set; }

		public string UserName { get; set; }

		public int FilmId { get; set; }

		public string Date { get; set; }

		public string Text { get; set; }

		public CommentViewModel() {
		}

		public CommentViewModel(Comment comment){
			Id = comment.Id;
			Date = comment.Date.ToString();
			FilmId = comment.FilmId;
			Text = comment.Text;
			UserId = comment.UserId;
		}
	}
}