"use strict";
(function () {
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
      form.reset();
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

