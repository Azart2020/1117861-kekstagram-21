
'use strict';
(function () {

  const RANDOM_PHOTOS_AMOUNT = 10;
  const imageFilters = document.querySelector(`.img-filters`);
  const randomPhotosButton = imageFilters.querySelector(`#filter-random`);
  const discussedPhotosButton = imageFilters.querySelector(`#filter-discussed`);
  const defaultPhotosButton = imageFilters.querySelector(`#filter-default`);

  const getFilter = function (photos) {
    imageFilters.classList.remove(`img-filters--inactive`);
    const toggleSelectedFilter = function (selectedFilter) {
      let activeFilter = imageFilters.querySelector(`.img-filters__button--active`);

      activeFilter.classList.remove(`img-filters__button--active`);
      selectedFilter.classList.add(`img-filters__button--active`);
    };

    window.renderPhoto.renderPictures(photos);

    const deletePhotos = function () {
      let picArray = document.querySelectorAll(`a.picture`);
      picArray.forEach(function (element) {
        element.remove();
      });
    };


    defaultPhotosButton.addEventListener(`click`, function () {
      toggleSelectedFilter(defaultPhotosButton);
      deletePhotos();
      window.debounce.setDebounce(window.renderPhoto.renderPictures(photos));
    });

    randomPhotosButton.addEventListener(`click`, function () {
      toggleSelectedFilter(randomPhotosButton);
      deletePhotos();
      const randomPhotos = [];
      while (randomPhotos.length < RANDOM_PHOTOS_AMOUNT) {
        const randomPhoto = window.data.getRandomElement(photos);
        if (!randomPhotos.includes(randomPhoto)) {
          randomPhotos.push(randomPhoto);
        }
      }
      window.debounce.setDebounce(window.renderPhoto.renderPictures(randomPhotos));
    });

    discussedPhotosButton.addEventListener(`click`, function () {
      toggleSelectedFilter(discussedPhotosButton);
      deletePhotos();
      let newArrayPhotos = photos.slice();
      const sortedPhotos = newArrayPhotos.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.debounce.setDebounce(window.renderPhoto.renderPictures(sortedPhotos));
    });
  };
  window.filters = {
    getFilter};
})();
