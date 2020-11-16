
'use strict';

const RANDOM_PHOTOS_AMOUNT = 10;
const imageFilters = document.querySelector(`.img-filters`);
const imagesFiltersForm = imageFilters.querySelector(`.img-filters__form`);
const randomPhotosButton = imageFilters.querySelector(`#filter-random`);
const discussedPhotosButton = imageFilters.querySelector(`#filter-discussed`);
const defaultPhotosButton = imageFilters.querySelector(`#filter-default`);

const showFiltersForm = () => imagesFiltersForm.classList.remove(`hidden`);

const runFilter = (photos) => {
  imageFilters.classList.remove(`img-filters--inactive`);
  const toggleSelectedFilter = (selectedFilter) => {
    let activeFilter = imageFilters.querySelector(`.img-filters__button--active`);

    activeFilter.classList.remove(`img-filters__button--active`);
    selectedFilter.classList.add(`img-filters__button--active`);
  };

  window.renderPhoto.renderPictures(photos);

  const deletePhotos = () => {
    let picArray = document.querySelectorAll(`a.picture`);
    picArray.forEach(function (element) {
      element.remove();
    });
  };

  const renderDefault = () => {
    deletePhotos();
    window.renderPhoto.renderPictures(photos);
  };

  const renderRandom = () => {
    deletePhotos();
    const randomPhotos = [];
    while (randomPhotos.length < RANDOM_PHOTOS_AMOUNT) {
      const randomPhoto = window.data.getRandomElement(photos);
      if (!randomPhotos.includes(randomPhoto)) {
        randomPhotos.push(randomPhoto);
      }
    }
    window.renderPhoto.renderPictures(randomPhotos);
  };

  const renderDiscussed = () => {
    deletePhotos();
    const sortedPhotos = photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPhoto.renderPictures(sortedPhotos);
  };
  const renderFiltered = (type) => {
    switch (type) {
      case `random`: {
        renderRandom();
        break;
      }
      case `discussed`: {
        renderDiscussed();
        break;
      }
      default: {
        renderDefault();
        break;
      }
    }
  };

  const renderFilteredDebounced = window.utils.setDebounce(renderFiltered);

  defaultPhotosButton.addEventListener(`click`, function () {
    toggleSelectedFilter(defaultPhotosButton);
    renderFilteredDebounced(`default`);
  });

  randomPhotosButton.addEventListener(`click`, function () {
    toggleSelectedFilter(randomPhotosButton);
    renderFilteredDebounced(`random`);
  });

  discussedPhotosButton.addEventListener(`click`, function () {
    toggleSelectedFilter(discussedPhotosButton);
    renderFilteredDebounced(`discussed`);
  });
};
window.filters = {
  runFilter,
  showFiltersForm
};
