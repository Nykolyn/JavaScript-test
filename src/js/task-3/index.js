import * as basicLightbox from "basiclightbox";
// had to import css file like this, because plugin looks for dist folder and parcel uses the same folder
import "basiclightbox/dist/basicLightbox.min.css";

import Gallery from "./Gallery";
import { PER_PAGE } from "./api";
import { drawInitialMarkup } from "./vues";

drawInitialMarkup();
const galleryList = document.querySelector(".gallery-list");
const observerTrigger = document.getElementById("observer-trigger");
const searchInput = document.querySelector("#search-form input");

const gallery = new Gallery();

const handleSearch = async ({ target: { value } }) => {
  if (!value.trim()) return;

  try {
    await gallery.fetch(value);
    galleryList.innerHTML = gallery.drawPhotos();
  } catch (e) {
    console.error("error while fetching data", e);
  }
};

const observerCallback = (entries) => {
  entries.forEach(async (entry) => {
    if (entry.intersectionRatio > 0 && gallery.total >= PER_PAGE) {
      try {
        await gallery.loadMore();
        galleryList.innerHTML = gallery.drawPhotos();
      } catch (e) {
        console.error("error while fetching data", e);
      }
    }
  });
};

const handleClickImage = ({ target }) => {
  if (target.nodeName === "IMG") {
    basicLightbox
      .create(`<img width="1400" height="900" src=${target.dataset.source}>`)
      .show();
  }
};

const observerOptions = {};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(observerTrigger);

searchInput.addEventListener("input", handleSearch);
galleryList.addEventListener("click", handleClickImage);
