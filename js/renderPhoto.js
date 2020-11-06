"use strict";
(function () {
  const picturesContainer = document.querySelector(`.pictures`);
  const pictureTemplate = document.querySelector(`#picture`).content.querySelector(`.picture`);

  const onSuccess = function () {
    renderPicture(photos);
    window.server.loads(onSuccess, window.util.onError);
  };

  const renderPictures = function (pictures) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < pictures.length; i++) {
      const picture = pictures[i];
      const pictureElement = renderPicture(picture);
      fragment.appendChild(pictureElement);
    }
    picturesContainer.appendChild(fragment);
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
    photoClose.removeEventListener(`click`, onClosePhotoClick);
    document.body.removeEventListener(`keydown`, onBodyPhotoKeydown);
  };

  const mainPicture = document.querySelector(`.big-picture__preview`);
  const photoClose = document.querySelector(`.big-picture__cancel`);

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

  const createComment = function (comment) {
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

  const createComments = function (comments) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < comments.length; i++) {
      const commentElement = createComment(comments[i]);
      fragment.appendChild(commentElement);
    }
    return fragment;
  };

  const showBigPicture = function (photo) {
    mainPicture.classList.remove(`hidden`);
    mainPicture.querySelector(`.big-picture__img img`).src = photo.url;
    mainPicture.querySelector(`.likes-count`).textContent = photo.likes;
    mainPicture.querySelector(`.comments-count`).textContent = photo.comments.length;
    mainPicture.querySelector(`.social__caption`).textContent = photo.description;
    mainPicture.querySelector(`.social__picture`).alt = photo.name;

    const commentsContainer = mainPicture.querySelector(`.social__comments`);

    const socialElement = mainPicture.querySelector(`.social__comments`);
    removeChildren(socialElement);

    commentsContainer.appendChild(createComments(photo.comments));

    const commentCount = document.querySelector(`.social__comment-count`);
    const commentLoad = document.querySelector(`.comments-loader`);
    commentCount.classList.add(`hidden`);
    commentLoad.classList.add(`hidden`);
  };


  window.renderPhoto = {
    showBigPicture,
    renderPictures,
    onSuccess
  };

})();
