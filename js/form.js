'use strict';
const form = document.querySelector('.img-upload__form');
const openForm = document.querySelector('.scale__control');
const photoForm = document.querySelector('.img-upload__overlay');
const closeForm = document.querySelector('.img-upload__cancel');
const uploadFile = document.getElementById('.upload-file');
const hashTags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');
const effectLevelPin = document.querySelector('.effect-level__pin');

let HashTags = {
  MAX_LENGTH: 20,
  MAX_COUNT: 5
};


const onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = function () {
  photoForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

};

const closePopup = function () {
  photoForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.addEventListener('keydown', onPopupEscPress);
};

openForm.addEventListener('click', function () {
  openPopup();
});

closeForm.addEventListener('click', function () {
  closePopup();
})
;

hashTags.addEventListener('invalid', function () {
  let tags = hashTags.value.toLowerCase().split(' ');
  let regex = /#[a-zA-Z0-9]+(\s|$\s?)/;

  if (tags > HashTags.MAX_COUNT) {
    hashTags.setCustomValidity('Нельзя указать больше' + HashTags.MAX_COUNT + 'хэш-тегов');
  } else if (regex.test(tags)) {
    hashTags.setCustomValidity('хэш-тег начинается с символа # (решётка), строка после решётки должна состоять из букв\
     и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.),\
      эмодзи и т. д., хеш-тег не может состоять только из одной решётки,хэш-теги разделяются пробелами');
  } else {
    hashTags.setCustomValidity('');
  }
  hashTags.reportValidity();
});

textDescription.addEventListener('invalid', function () {
  if (textDescription.validity.tooLong) {
    hashTags.setCustomValidity('Длина комментария не может составлять больше 140 символов;');
  } else {
    hashTags.setCustomValidity('');
  }
  hashTags.reportValidity();
});

effectLevelPin.addEventListener('mouseup', function () {
});

/*
const validate = function () {
  let tags = hashTags.value.split(' ');
  let regex = /#[a-zA-Z0-9]+\s/;
  if (regex.test(tags)) {

  };
};


uploadFile.addEventListener('change', function () {
  как я понимаю это обработчик события изменения на #upload-file после которого должна открываться форма
});
*/
