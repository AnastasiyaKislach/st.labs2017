using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilmGallery.Entities {
	public class Image {
		public int Id { get; set; }
		public string Url { get; set; }
		public int FilmId { get; set; }
	}
}
