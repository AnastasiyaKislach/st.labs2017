﻿using System.Data.Entity;
using FilmGallery.Entities;

namespace FilmGallery.DataAccess {
	public class FilmGalleryContext: DbContext {
		public DbSet<Film> Films { get; set; }
		public DbSet<Comment> Comments { get; set; }
		public DbSet<Rating> Ratings { get; set; }
		public DbSet<Image> Images { get; set; }

		public FilmGalleryContext()
			: this("DBConnection") {
		}
		public FilmGalleryContext(string connectionString)
			: base(connectionString) {
		}
		public static FilmGalleryContext Create() {
			return new FilmGalleryContext();
		}
	}
}