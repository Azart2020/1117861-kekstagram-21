"use strict";


const getRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (elements) => {
  const index = getRandomIndex(elements);
  return elements[index];
};

const getRandomIndex = (elements) => getRandomNumber(0, elements.length - 1);


window.data = {
  getRandomNumber,
  getRandomElement
};
