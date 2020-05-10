import * as basicLightbox from "basiclightbox";
import "basiclightbox/dist/basicLightbox.min.css";

const API_KEY = process.env.API_KEY;
const API_URL = `https://pixabay.com/api/?key=${API_KEY}`;
let total = 0;
let page = 1;
const wrapper = document.querySelector(".task-3");
wrapper.style.padding = "2rem";

const searchFormHTML =
  '<form id="search-form" style="margin-bottom:2rem"><input type="text" name="query" autocomplete="off" placeholder="Search images..."/> </form>';
wrapper.insertAdjacentHTML("afterbegin", searchFormHTML);

const galleryListHTML =
  '<ul class="gallery-list" style="display:flex;flex-wrap:wrap;justify-content:space-around;;list-style-type:none;padding:0;margin:0;"></ul>';
wrapper.insertAdjacentHTML("beforeend", galleryListHTML);
const galleryList = document.querySelector(".gallery-list");

wrapper.insertAdjacentHTML("beforeend", '<div id="observer-trigger"/>');

const observerTrigger = document.getElementById("observer-trigger");

const searchInput = document.querySelector("#search-form input");

const handleSearch = async ({ target: { value } }) => {
  if (!value.trim()) return;

  try {
    const { hits } = await fetch(`${API_URL}&q=${value}`).then((result) =>
      result.json()
    );
    total = hits.length;
    page = 1;
    galleryList.innerHTML = hits.reduce(
      (acc, { webformatURL, largeImageURL, tags }) =>
        // <a href=${largeImageURL}  target="_blank">
        acc +
        `
                <li style="margin-bottom:2rem">
                <img style="width:400px;height:400px"        src=${webformatURL}         data-source=${largeImageURL}        alt=${tags}       />     
                </li>`,
      ""
      // </a>
    );
  } catch (e) {
    console.error("error while fetching data", e);
  }
};

searchInput.addEventListener("input", handleSearch);

var options = {};

var callback = function (entries) {
  entries.forEach(async (entry) => {
    if (entry.intersectionRatio > 0 && total >= 20) {
      try {
        const { hits } = await fetch(
          `${API_URL}&q=${searchInput.value}&page=${page}`
        ).then((result) => result.json());

        total = hits.length;
        page += 1;
        galleryList.innerHTML += hits.reduce(
          (acc, { webformatURL, largeImageURL, tags }) =>
            // <a href=${largeImageURL} target="_blank">
            acc +
            `
                    <li style="margin-bottom:2rem">
                    <img style="width:400px;height:400px"        src=${webformatURL}         data-source=${largeImageURL}        alt=${tags}       />     
                    </li>`,
          ""
          // </a>
        );
      } catch (e) {
        console.error("error while fetching data", e);
      }
    }
  });
};

var observer = new IntersectionObserver(callback, options);
observer.observe(observerTrigger);

const handleClickImage = ({ target }) => {
  if (target.nodeName === "IMG") {
    basicLightbox
      .create(
        `
		<img width="1400" height="900" src=${target.dataset.source}>
	`
      )
      .show();
  }
};

galleryList.addEventListener("click", handleClickImage);
