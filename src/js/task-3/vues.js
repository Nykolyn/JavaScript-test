export const searchFormHTML =
  '<form id="search-form" style="margin-bottom:2rem"><input type="text" name="query" autocomplete="off" placeholder="Search images..."/> </form>';

export const galleryListHTML =
  '<ul class="gallery-list" style="display:flex;flex-wrap:wrap;justify-content:space-around;;list-style-type:none;padding:0;margin:0;"></ul>';

export const galleryItemHTML = ({ webformatURL, largeImageURL, tags }) =>
  `<li style="margin-bottom:2rem">
    <img style="width:400px;height:400px" src=${webformatURL} data-source=${largeImageURL} alt=${tags}/>
</li>`;

export const drawInitialMarkup = () => {
  const wrapper = document.querySelector(".task-3");
  wrapper.style.padding = "2rem";
  wrapper.insertAdjacentHTML("afterbegin", searchFormHTML);
  wrapper.insertAdjacentHTML("beforeend", galleryListHTML);
  wrapper.insertAdjacentHTML("beforeend", '<div id="observer-trigger"/>');
};
