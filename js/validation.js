"use strict";

(function () {

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
