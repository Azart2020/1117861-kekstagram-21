"use strict";
(function () {
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
