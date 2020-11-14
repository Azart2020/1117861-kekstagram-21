"use strict";


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


window.data = {
  getRandomNumber,
  getRandomElement
};
