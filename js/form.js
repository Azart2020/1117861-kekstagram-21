"use strict";
const photoForm = document.querySelector(`.img-upload__overlay`);
const closeForm = document.querySelector(`.img-upload__cancel`);
const uploadFile = document.querySelector(`#upload-file`);
const effectLevelPin = document.querySelector(`.effect-level__pin`);
const effects = document.querySelector(`.effects`);
const preview = document.querySelector(`.img-upload__preview`);
const textField = document.querySelector(`.text__description`);
const socialField = document.querySelector(`.social__footer-text`);
const hashtags = document.querySelector(`.text__hashtags`);
const modalCloseButton = `Escape`;

let onPopupEscPress = function (evt) {
  if (evt.key === modalCloseButton) {
    evt.preventDefault();
    closePopup();
  }
};

let openPopup = function () {
  photoForm.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

let closePopup = function () {
  photoForm.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

uploadFile.addEventListener(`change`, function () {
  openPopup();
});

closeForm.addEventListener(`click`, function () {
  closePopup();
});
closeForm.addEventListener(`keydown`, function (evt) {
  if (evt.key === modalCloseButton) {
    closePopup();
  }
});
hashtags.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
});
textField.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
});
socialField.addEventListener(`keydown`, function (evt) {
  evt.stopPropagation();
});
let choisenType = `none`;

effects.addEventListener(`change`, function (evt) {
  let toggler = evt.target;
  let className = `effects__preview--` + toggler.value;
  let previewClassName = `effects__preview--` + choisenType;
  if (className !== previewClassName) {
    preview.classList.remove(previewClassName);
  }
  preview.classList.add(className);
  choisenType = toggler.value;
});

const effectLevelValue = document.querySelector(`.effect-level__value`);

effectLevelPin.addEventListener(`mouseup`, function () {
  let pinValue = effectLevelValue.value;
  let filterValue;

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
});
