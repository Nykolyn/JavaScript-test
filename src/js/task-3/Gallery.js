import { fetchData, fetchNextPage } from "./api";
import { galleryItemHTML } from "./vues";

class Gallery {
  constructor() {
    this.query = "";
    this.photos = [];
    this.total = this.photos.length;
    this.page = 1;
  }

  async fetch(query) {
    try {
      this.query = query;
      const { hits } = await fetchData({ query });
      this.photos = hits;
      this.total = this.photos.length;
    } catch (e) {
      console.error("error while fetching", e);
    }
  }

  async loadMore() {
    try {
      const { page, photos, query } = this;
      this.page += 1;

      const { hits } = await fetchNextPage({ query, page });
      this.photos = [...photos, ...hits];
      this.total = photos.length;
    } catch (e) {
      console.error("error while loading on scroll", e);
    }
  }

  drawPhotos() {
    const HTMLMarkup = this.photos.reduce(
      (acc, { webformatURL, largeImageURL, tags }) =>
        acc + galleryItemHTML({ webformatURL, largeImageURL, tags }),
      ""
    );

    return HTMLMarkup;
  }
}

export default Gallery;
