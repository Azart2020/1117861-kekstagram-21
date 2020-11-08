"use strict";
(function () {
  const form = document.querySelector(`.img-upload__form`);
  const photoForm = document.querySelector(`.img-upload__overlay`);
  const closeForm = document.querySelector(`.img-upload__cancel`);
  const uploadFile = document.querySelector(`#upload-file`);
  const effectLevelPin = document.querySelector(`.effect-level__pin`);
  const effects = document.querySelector(`.effects`);
  const preview = document.querySelector(`.img-upload__preview > img`);
  const textField = document.querySelector(`.text__description`);
  const socialField = document.querySelector(`.social__footer-text`);
  const effectLevelValue = document.querySelector(`.effect-level__value`);
  const effectLevelLine = document.querySelector(`.effect-level__line`);
  const effectLevelDepth = document.querySelector(`.effect-level__depth`);
  const main = document.querySelector(`main`);
  const successMessageTemplate = document.querySelector(`#success.success`);
  const errorMessageTemplate = document.querySelector(`#error.success`);
  const closeButton = document.querySelector(`.success__button, .error__button`);

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

    document.addEventListener(`keydown`, onPopupEscPress);
  };

  const closePopup = function () {
    photoForm.classList.add(`hidden`);

    document.removeEventListener(`keydown`, onPopupEscPress);
  };

  uploadFile.addEventListener(`change`, function () {
    openPopup();
    if (preview.classList.contains(`effects__preview--none`)) {
      effectLevelPin.classList.add(`hidden`);
      effectLevelLine.classList.add(`hidden`);
      effectLevelDepth.style.width = `0%`;
    }
  });

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    window.server.unload(new FormData(form),
        function () {
          closePopup();
          form.reset();
          showMessage(successMessageTemplate);},
        function () {
          closePopup();
          showMessage(errorMessageTemplate);
        });


    const showMessage = function (template) {
      const message = template.cloneNode(true);
      main.appendChild(message);
      document.addEventListener(`keydown`, onMessageEscPress);
    };

    const onMessageEscPress = function (evt) {
      if (window.utils.isEscape(evt)) {
        evt.preventDefault();
        closeMessage();
      }
    };
    const closeMessage = function () {
      main.removeChild(message);
      document.removeEventListener(`keydown`, onMessageEscPress);
    };

    closeButton.addEventListener(`click`, function () {
      closeMessage();
    });

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
      effectLevelPin.classList.remove(`hidden`);
      effectLevelDepth.style.width = `100%`;
      effectLevelPin.style.left = `100%`;
      effectLevelLine.classList.remove(`hidden`);
    }
    if (className === `effects__preview--none`) {
      effectLevelDepth.style.width = `0%`;
      effectLevelPin.style.left = `0%`;
      effectLevelPin.classList.add(`hidden`);
      effectLevelLine.classList.add(`hidden`);
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

