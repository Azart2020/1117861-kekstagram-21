"use strict";
const picturesContainer = document.querySelector(`.pictures`);
const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);
const mainPicture = document.querySelector(`.big-picture`);
const buttonPhotoClose = document.querySelector(`.big-picture__cancel`);
const commentLoad = mainPicture.querySelector(`.comments-loader`);
const commentsContainer = mainPicture.querySelector(`.social__comments`);
const socialElement = mainPicture.querySelector(`.social__comments`);
const countElement = mainPicture.querySelector(`.shown-comments-count`);
const commentFieldText = mainPicture.querySelector(`.social__footer-text`);
const COMMENTS_STEP = 5;

let onCommentsloadClick = null;
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const pictureElement = renderPicture(picture);
    fragment.appendChild(pictureElement);
  }
  picturesContainer.appendChild(fragment);
  window.filters.showFiltersForm();
};

const onClosePhotoClick = () => closePhoto();

const onBodyPhotoKeydown = (evt) => {
  if (window.utils.isEscape(evt)) {
    closePhoto();
  }
};

const closePhoto = () => {

  mainPicture.classList.add(`hidden`);
  document.body.classList.remove(`modal-open`);
  mainPicture.removeEventListener(`click`, onClosePhotoClick);
  buttonPhotoClose.removeEventListener(`click`, onClosePhotoClick);
  document.body.removeEventListener(`keydown`, onBodyPhotoKeydown);
  commentFieldText.addEventListener(`keydown`, onCommentFieldEsc);
  if (onCommentsloadClick) {
    commentLoad.removeEventListener(`click`, onCommentsloadClick);
    onCommentsloadClick = null;
  }
};

const renderPicture = (picture) => {
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

const removeChildren = (element) => {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};
const onCommentFieldEsc = (evt) => evt.stopPropagation();
const showBigPicture = (photo) => {
  mainPicture.classList.remove(`hidden`);
  mainPicture.querySelector(`.big-picture__img img`).src = photo.url;
  mainPicture.querySelector(`.likes-count`).textContent = photo.likes;
  mainPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
  mainPicture.querySelector(`.social__caption`).textContent = photo.description;
  mainPicture.querySelector(`.social__picture`).alt = photo.name;
  document.body.classList.add(`modal-open`);
  commentFieldText.addEventListener(`keydown`, onCommentFieldEsc);
  buttonPhotoClose.addEventListener(`click`, function () {
    mainPicture.addEventListener(`click`, onClosePhotoClick);
    document.body.addEventListener(`keydown`, onBodyPhotoKeydown);
  });

  removeChildren(socialElement);

  let currentIndex = 0;
  const loadComments = () => {
    const hasMoreComments = window.comments.renderCommentsSlice(
        photo.comments,
        commentsContainer,
        currentIndex
    );
    currentIndex += COMMENTS_STEP;
    countElement.textContent = Math.min(currentIndex, photo.comments.length);
    window.comments.updateButtonVisibility(commentLoad, hasMoreComments);
    return hasMoreComments;
  };

  if (loadComments()) {
    onCommentsloadClick = () => loadComments();
    commentLoad.addEventListener(`click`, onCommentsloadClick);
  }
};

window.renderPhoto = {
  showBigPicture,
  renderPictures
};

