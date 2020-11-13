'use strict';
(function () {
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
