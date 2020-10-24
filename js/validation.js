'use strict';
const hashtags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const MAX_COMMENT_LENGTH = 140;
const Hashtags = {
  MAX_LENGTH: 20,
  MAX_COUNT: 2
};

 var addBorder = function (input) {
    input.style.borderColor = 'red';
  };

  var removeBorder = function (input) {
    input.style.borderColor = 'transparent';
  };

const checkValidityHashtag = function () {

let hashtagsSpacesValidity = [];

hashtags.addEventListener('change', function (evt) {
  let hashtagInput = evt.target;
  let hashtagsAll = hashTagInput.value;
  let tags = hashtagsAll.trim().toLowerCase().split(' ');
  console.log(tags)

  for (var i = 0; i < hashtags.length; i++) {

      if (hashtags[i].length > Hashtags.MAX_LENGTH) {
        hashtags.setCustomValidity('максимальная длина одного хэш-тега ' + HashTags.MAX_LENGTH + ' символов, включая решётку');
        return false;
      };

      if (hashtags.length > Hashtags.MAX_COUNT) {
      hashtags.setCustomValidity('Нельзя указать больше' + HashTags.MAX_COUNT + 'хэш-тегов');
       addBorder(hashtags);
      return false;
      };

      if (hashtags[i][0] !== '#') {
        hashtags.setCustomValidity('Каждый хэштег должен начинаться с #');
        addBorder(hashtags);
        return false;
      };

       hashtagsSpacesValidity[i] = hashtags[i].slice(1);
      if (hashtagsSpacesValidity[i].search(/#/) !== -1) {
        hashtags.setCustomValidity('Хэштеги должны разделяться пробелами');
        addBorder(hashtags);
        return false;
      };
      if (hashtags.indexOf(hashtags[i]) !== i) {
        hashtags.setCustomValidity('Хэштеги не должны повторяться');
        addBorder(hashtags);
        return false;
      };
      hashtags.setCustomValidity('');
      removeBorder(hashtags);
      return true;
    };
});
};

  const commentValidityCheck = function () {
    if (textDescription.value.length > MAX_COMMENT_LENGTH) {
      textDescription.setCustomValidity('Комментарий не должен содержать больше 140 символов.');
      addBorder(textDescription);
    } else {
      textDescription.setCustomValidity('');
      removeBorder(textDescription);
    }
  };
