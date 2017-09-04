using System.Data.Entity;
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
			Database.SetInitializer(new MigrateDatabaseToLatestVersion<FilmGalleryContext, Migrations.Configuration>(connectionString));
		}
		protected override void OnModelCreating(DbModelBuilder modelBuilder) {
			base.OnModelCreating(modelBuilder);
		}
		public static FilmGalleryContext Create() {
			return new FilmGalleryContext();
		}
	}
}