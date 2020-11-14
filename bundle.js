/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!******************************!*\
  !*** ./js/server-message.js ***!
  \******************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const main = document.querySelector(`main`);
const errorMessageTemplate = document.querySelector(`#error`).content.querySelector(`.error`);
const successMessageTemplate = document.querySelector(`#success`).content.querySelector(`.success`);

const render = function (template, prefix, title) {
  const modal = template.cloneNode(true);
  if (title) {
    modal.querySelector(`.${prefix}__title`).textContent = title;
  }

  const closeModal = function () {
    window.removeEventListener(`keydown`, onWindowKeydown);
    document.body.removeEventListener(`click`, onBodyClick);
    modal.remove();
  };

  const onWindowKeydown = function (evt) {
    if (window.utils.isEscape(evt)) {
      closeModal();
    }
  };

  const onBodyClick = function () {
    closeModal();
  };

  window.addEventListener(`keydown`, onWindowKeydown);
  document.body.addEventListener(`click`, onBodyClick);

  main.appendChild(modal);
};

const renderLoadError = function (errorMessage) {
  render(errorMessageTemplate, `error`, errorMessage);
};

const renderSaveError = function (errorMessage) {
  render(errorMessageTemplate, `error`, `Ошибка загрузки файла: ${errorMessage}`);
};

const renderSuccess = function () {
  render(successMessageTemplate, `success`);
};

window.serverMessage = {
  renderLoadError,
  renderSaveError,
  renderSuccess
};

})();

(() => {
/*!***********************!*\
  !*** ./js/filters.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const RANDOM_PHOTOS_AMOUNT = 10;
const imageFilters = document.querySelector(`.img-filters`);
const imagesFiltersForm = imageFilters.querySelector(`.img-filters__form`);
const randomPhotosButton = imageFilters.querySelector(`#filter-random`);
const discussedPhotosButton = imageFilters.querySelector(`#filter-discussed`);
const defaultPhotosButton = imageFilters.querySelector(`#filter-default`);

const showFiltersForm = function () {
  imagesFiltersForm.classList.remove(`hidden`);
};

const runFilter = function (photos) {
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

  const renderDefault = function () {
    deletePhotos();
    window.renderPhoto.renderPictures(photos);
  };

  const renderRandom = function () {
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

  const renderDiscussed = function () {
    deletePhotos();
    const sortedPhotos = photos.slice().sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.renderPhoto.renderPictures(sortedPhotos);
  };
  const renderFiltered = function (type) {
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

})();

(() => {
/*!**********************!*\
  !*** ./js/server.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const Url = {
  GET: `https://21.javascript.pages.academy/kekstagram/data`,
  POST: `https://21.javascript.pages.academy/kekstagram`
};

const Method = {
  GET: `GET`,
  POST: `POST`
};

const StatusCode = {
  OK: 200,
  NOT_FOUND: 404,
  BAD_REQUEST: 400,
  NOT_AUTHORIZED: 401,
  INTERNAL_SERVER_ERROR: 500
};

const ErrorMessage = {
  400: `Неверный запрос`,
  401: `Пользователь не авторизован`,
  404: `Ничего не найдено`,
  500: `Ошибка сервера`
};

const TIMEOUT_IN_MS = 10000;

const request = function (url, method, onSuccess, onError, data) {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
      return;
    }

    const error = ErrorMessage[xhr.status]
      ? ErrorMessage[xhr.status]
      : `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;

    onError(error);
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);

  xhr.send(data);
};

const load = function (onSuccess) {
  request(Url.GET, Method.GET, onSuccess, window.serverMessage.renderLoadError);
};

const save = function (data, onSuccess) {
  request(Url.POST, Method.POST, onSuccess, window.serverMessage.renderSaveError, data);
};

window.server = {
  load,
  save
};

})();

(() => {
/*!*********************!*\
  !*** ./js/utils.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const ESCAPE = `Escape`;
const DEBOUNCE_INTERVAL = 500;
const isEscape = function (evt) {
  return evt.key === ESCAPE;
};

const setDebounce = function (fn, interval = DEBOUNCE_INTERVAL) {
  let lastTimeout = null;

  const debounced = function (...elements) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(function () {
      fn(...elements);
    }, interval);
  };

  return debounced;
};
window.utils = {
  isEscape,
  setDebounce
};

})();

(() => {
/*!********************!*\
  !*** ./js/data.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const DESCRIPTION = [
  `Тестим новую камеру! =)`,
  `Первый опыт в фотографии`,
  `Теплые воспоминания`,
  `Редкий кадр`,
  `То что меня вдохновляет`,
];

const Count = {
  PHOTOS: 25,
  LIKES_MIN: 15,
  LIKES_MAX: 200,
  COMMENTS: 2,
};

const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = function (elements) {
  const index = getRandomIndex(elements);
  return elements[index];
};

const getRandomIndex = function (elements) {
  return getRandomNumber(0, elements.length - 1);
};

const getRandomPhotos = function (count = Count.PHOTOS) {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    const picture = getRandomDescription(i);
    pictures[i] = picture;
  }
  return pictures;
};

const getPhoto = function (number) {
  return `photos/` + (number + 1) + `.jpg`;
};

const getTextPhoto = function () {
  return getRandomElement(DESCRIPTION);
};

const getAmountComment = function (amount) {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    const comment = window.comments.getRandomComment();
    comments[i] = comment;
  }
  return comments;
};


const getRandomDescription = function (number) {
  return {
    url: getPhoto(number),
    description: getTextPhoto(),
    likes: getRandomNumber(Count.LIKES_MIN, Count.LIKES_MAX),
    comments: getAmountComment(Count.COMMENTS),
  };
};

window.data = {
  getRandomNumber,
  getRandomElement,
  getRandomPhotos
};

})();

(() => {
/*!*********************!*\
  !*** ./js/scale.js ***!
  \*********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const scale = document.querySelector(`.scale`);
const scaleControlSmaller = scale.querySelector(`.scale__control--smaller`);
const scaleControlBigger = scale.querySelector(`.scale__control--bigger`);
const scaleControlValue = scale.querySelector(`.scale__control--value`);
const imgEditorPreview = document.querySelector(`.img-upload__preview img`);

const Scale = {
  STEP: 25,
  MIN: 25,
  MAX: 100,
  DEFAULT: 100
};
let scaleValue = Scale.DEFAULT;

const changeSize = function (value) {
  imgEditorPreview.style.transform = `scale(` + value / 100 + `)`;
  scaleControlValue.value = value + `%`;
  scaleValue = value;
};

scaleControlSmaller.addEventListener(`click`, function () {
  if (scaleValue > Scale.MIN) {
    changeSize(scaleValue - Scale.STEP);
  }
});

scaleControlBigger.addEventListener(`click`, function () {
  if (scaleValue < Scale.MAX) {
    changeSize(scaleValue + Scale.STEP);
  }
});
const reset = function () {
  changeSize(Scale.DEFAULT);
};

window.scale = {
  reset
};

})();

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



const hashtags = document.querySelector(`.text__hashtags`);
const Hashtags = {
  MAX_LENGTH: 20,
  MAX_COUNT: 5,
};

const showValidationError = function (message) {
  hashtags.setCustomValidity(message);
  hashtags.reportValidity();
};

hashtags.addEventListener(`change`, function (evt) {
  let hashtagInput = evt.target;
  let hashtagsAll = hashtagInput.value.replace(/\s+/g, ` `);
  let tags = hashtagsAll.trim().toLowerCase().split(` `);

  if (tags.length > Hashtags.MAX_COUNT) {
    showValidationError(
        `Максимальное количество хэштегов не более ` + Hashtags.MAX_COUNT
    );
    return;
  }
  const currentTags = [];
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    const resultOfValidation = checkValidityHashtag(tag);

    if (!resultOfValidation) {
      showValidationError(
          `Не правильно введен хэштег! Максимальная длина одного хэш-тега ` +
          Hashtags.MAX_LENGTH +
          ` символов, включая решётку, Каждый хэштег должен начинаться с #, хэштеги должны разделяться пробелами,
        строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы.`
      );
      return;
    }

    if (currentTags.includes(tag)) {
      showValidationError(`Хештэги не должны повторяться`);
      return;
    }
    currentTags.push(tag);
  }
  showValidationError(``);
});

const checkValidityHashtag = function (tag) {
  return /^#[a-zA-Zа-яА-ЯёЁ0-9]{1,20}$/.test(tag);
};

window.validation = {
  hashtags
};

})();

(() => {
/*!********************!*\
  !*** ./js/form.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const form = document.querySelector(`.img-upload__form`);
const photoForm = document.querySelector(`.img-upload__overlay`);
const closeForm = document.querySelector(`.img-upload__cancel`);
const uploadFile = document.querySelector(`#upload-file`);
const effectLevel = document.querySelector(`.effect-level`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effects = document.querySelector(`.effects`);
const preview = document.querySelector(`.img-upload__preview > img`);
const textField = document.querySelector(`.text__description`);
const socialField = document.querySelector(`.social__footer-text`);
const effectLevelValue = document.querySelector(`.effect-level__value`);
const effectLevelLine = document.querySelector(`.effect-level__line`);
const effectLevelDepth = document.querySelector(`.effect-level__depth`);

const updateFilters = function () {
  const pinValue = effectLevelValue.value;
  let filterValue;
  if (preview.classList.contains(`effects__preview--none`)) {
    preview.style.webkitFilter = ``;
  }
  if (preview.classList.contains(`effects__preview--chrome`)) {
    filterValue = pinValue / 100;
    preview.style.webkitFilter = `grayscale(` + filterValue + `)`;
  }
  if (preview.classList.contains(`effects__preview--sepia`)) {
    filterValue = pinValue / 100;
    preview.style.webkitFilter = `sepia(` + filterValue + `)`;
  }
  if (preview.classList.contains(`effects__preview--marvin`)) {
    filterValue = pinValue;
    preview.style.webkitFilter = `invert(` + filterValue + `%` + `)`;
  }
  if (preview.classList.contains(`effects__preview--phobos`)) {
    filterValue = (pinValue * 3) / 100;
    preview.style.webkitFilter = `blur(` + filterValue + `px` + `)`;
  }
  if (preview.classList.contains(`effects__preview--heat`)) {
    filterValue = (pinValue * 3) / 100;
    preview.style.webkitFilter = `brightness(` + filterValue + `)`;
  }
};


const onPopupEscPress = function (evt) {
  if (window.utils.isEscape(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  photoForm.classList.remove(`hidden`);
  document.body.classList.add(`modal-open`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = function () {
  photoForm.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  document.removeEventListener(`keydown`, onPopupEscPress);
  window.scale.reset();
  clearForm();
};

uploadFile.addEventListener(`change`, function () {
  openPopup();
  if (preview.classList.contains(`effects__preview--none`)) {
    effectLevel.classList.add(`hidden`);
    effectLevelDepth.style.width = `0%`;
  }
});

form.addEventListener(`submit`, function (evt) {
  evt.preventDefault();

  const onSuccess = function () {
    closePopup();
    window.serverMessage.renderSuccess();
  };

  window.server.save(new FormData(form), onSuccess);
});

closeForm.addEventListener(`click`, function () {
  closePopup();
});

closeForm.addEventListener(`keydown`, function (evt) {
  if (window.utils.isEscape(evt)) {
    closePopup();
  }
});
window.validation.hashtags.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
});
textField.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
});
socialField.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
});

let chosenType = `none`;

effects.addEventListener(`change`, function (evt) {
  let toggler = evt.target;
  let className = `effects__preview--` + toggler.value;
  let previewClassName = `effects__preview--` + chosenType;
  if (className !== previewClassName) {
    preview.classList.remove(previewClassName);
  }
  if (className !== `effects__preview--none`) {
    effectLevel.classList.remove(`hidden`);
    effectLevelDepth.style.width = `100%`;
    effectLevelPin.style.left = `100%`;
    effectLevelLine.classList.remove(`hidden`);
  }
  if (className === `effects__preview--none`) {
    effectLevelDepth.style.width = `0%`;
    effectLevelPin.style.left = `0%`;
    effectLevel.classList.add(`hidden`);
  }
  preview.style.webkitFilter = ``;
  preview.classList.add(className);
  chosenType = toggler.value;

});
const clearForm = function () {
  preview.style = ``;
  preview.classList = ``;
  effectLevelDepth.style.width = `100%`;
  effectLevelPin.style.left = `100%`;
  preview.classList.add(`effects__preview--none`);
  form.reset();
};

effectLevelPin.addEventListener(`mousedown`, function (evt) {
  evt.preventDefault();

  const startCoordsX = evt.clientX;
  const startOffset = effectLevelPin.offsetLeft;
  const offsetWidth = effectLevelLine.offsetWidth;

  const getNewOffset = function (shiftX) {
    let newOffset = (startOffset - shiftX) * 100 / offsetWidth;

    if (newOffset < 0) {
      newOffset = 0;
    } else if (newOffset > 100) {
      newOffset = 100;
    }
    return newOffset;
  };

  const onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    const shiftX = startCoordsX - moveEvt.clientX;

    const newCoordsX = getNewOffset(shiftX);

    effectLevelPin.style.left = `${newCoordsX}%`;
    effectLevelDepth.style.width = `${newCoordsX}%`;

    effectLevelValue.value = Math.floor(newCoordsX);
    updateFilters();
  };

  const onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    updateFilters();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});



})();

(() => {
/*!************************!*\
  !*** ./js/comments.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const COMMENTS_AMOUNT = 5;
const renderComment = function (comment) {
  const commentElement = document.createElement(`li`);
  commentElement.classList.add(`social__comment`);

  const img = document.createElement(`img`);
  img.classList.add(`social__picture`);
  img.src = comment.avatar;
  img.alt = comment.name;
  commentElement.appendChild(img);

  const commentText = document.createElement(`p`);
  commentText.classList.add(`social__text`);
  commentText.textContent = comment.message;
  commentElement.appendChild(commentText);

  return commentElement;
};
const renderComments = function (comments) {
  const fragment = document.createDocumentFragment();
  comments.forEach(function (comment) {
    const commentElement = renderComment(comment);
    fragment.appendChild(commentElement);
  });
  return fragment;
};

const renderCommentsSlice = function (comments, parent, from, count = COMMENTS_AMOUNT) {
  const slicedComments = comments.slice(from, from + count);
  const commentsFragment = renderComments(slicedComments);
  parent.appendChild(commentsFragment);
  return from + count < comments.length;
};

const updateButtonVisibility = function (button, state) {
  return state
    ? button.classList.remove(`hidden`)
    : button.classList.add(`hidden`);
};
window.comments = {
  renderCommentsSlice,
  updateButtonVisibility
};


})();

(() => {
/*!***************************!*\
  !*** ./js/renderPhoto.js ***!
  \***************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

const picturesContainer = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const mainPicture = document.querySelector(`.big-picture`);
const photoClose = document.querySelector(`.big-picture__cancel`);
const commentLoad = mainPicture.querySelector(`.comments-loader`);
const commentsContainer = mainPicture.querySelector(`.social__comments`);
const socialElement = mainPicture.querySelector(`.social__comments`);
const countElement = mainPicture.querySelector(`.shown-comments-count`);

let onCommentsloadClick = null;
const renderPictures = function (pictures) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const pictureElement = renderPicture(picture);
    fragment.appendChild(pictureElement);
  }
  picturesContainer.appendChild(fragment);
  window.filters.showFiltersForm();
};

const onClosePhotoClick = function () {
  closePhoto();
};

const onBodyPhotoKeydown = function (evt) {
  if (window.utils.isEscape(evt)) {
    closePhoto();
  }
};

const closePhoto = function () {
  mainPicture.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  photoClose.removeEventListener(`click`, onClosePhotoClick);
  document.body.removeEventListener(`keydown`, onBodyPhotoKeydown);
  if (onCommentsloadClick) {
    commentLoad.removeEventListener(`click`, onCommentsloadClick);
    onCommentsloadClick = null;
  }
};

photoClose.addEventListener(`click`, function () {
  mainPicture.classList.remove(`hidden`);
  mainPicture.addEventListener(`click`, onClosePhotoClick);
  document.body.addEventListener(`keydown`, onBodyPhotoKeydown);
});

const renderPicture = function (picture) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector(`.picture__img`).src = picture.url;
  pictureElement.querySelector(`.picture__likes`).textContent = picture.likes;
  pictureElement.querySelector(`.picture__comments`).textContent = picture.comments.length;
  pictureElement.addEventListener(`click`, function () {
    showBigPicture(picture);

    document.addEventListener(`keydown`, onBodyPhotoKeydown);
  });
  return pictureElement;
};

const removeChildren = function (element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};

const showBigPicture = function (photo) {
  mainPicture.classList.remove(`hidden`);
  mainPicture.querySelector(`.big-picture__img img`).src = photo.url;
  mainPicture.querySelector(`.likes-count`).textContent = photo.likes;
  mainPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
  mainPicture.querySelector(`.social__caption`).textContent = photo.description;
  mainPicture.querySelector(`.social__picture`).alt = photo.name;
  document.body.classList.add(`modal-open`);

  removeChildren(socialElement);

  let currentIndex = 0;
  const loadComments = function () {
    const hasMoreComments = window.comments.renderCommentsSlice(
        photo.comments,
        commentsContainer,
        currentIndex
    );
    currentIndex += 5;
    countElement.textContent = Math.min(currentIndex, photo.comments.length);
    window.comments.updateButtonVisibility(commentLoad, hasMoreComments);
    return hasMoreComments;
  };

  if (loadComments()) {
    onCommentsloadClick = function () {
      loadComments();

    };
    commentLoad.addEventListener(`click`, onCommentsloadClick);
  }
};

window.renderPhoto = {
  showBigPicture,
  renderPictures
};


})();

(() => {
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

window.server.load(function (photos) {
  window.filters.runFilter(photos);
});

})();

/******/ })()
;