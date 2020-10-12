'use strict';

const PICTURE_CONTAINER = document.querySelector('.pictures');
const TEMPLATE_PICTURE = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Гарольд',
  'Ванс',
  'Жозеф',
  'Брунгильда',
  'Ефросиния',
  'Дарио',
  'Нестор',
  'Ада'
];

const getArrayPhoto = function (count) {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    const picture = getRandomDescription();
    pictures[i] = picture;
  }

  return pictures;
};


const getRandomNumber = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getPhoto = function () {


  return 'photos/' + getRandomNumber(1, 25) + '.jpg';
};
const getTextPhoto = function () {
  return getRandomNumber(5, 10) + ' баллов из ' + getRandomNumber(10, 13);
};

const getRandomIndex = function (elements) {
  return getRandomNumber(0, elements.length - 1);
};

const getRandomElement = function (elements) {
  const index = getRandomIndex(elements);
  return elements[index];
};

const getAmountComment = function (amount) {
  const comments = [];
  for (let i = 0; i < amount; i++) {
    const comment = getRandomComment();
    comments[i] = comment;
  }
  return comments;
};

const getRandomComment = function () {
  return {
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES)
  };
};

const getRandomDescription = function () {
  return {
    url: getPhoto(),
    description: getTextPhoto(),
    likes: getRandomNumber(15, 200),
    comments: getAmountComment(2)
  };
};

const renderPhotos = function (picture) {

  let photoElement = TEMPLATE_PICTURE.cloneNode(true);

  photoElement.querySelector('.picture__img').src = picture.url;
  photoElement.querySelector('.picture__likes').textContent = picture.likes;
  photoElement.querySelector('.picture__comments').textContent = picture.comments;

  return photoElement;
};

const photos = getArrayPhoto();

const fragment = document.createDocumentFragment();
for (let i = 0; i < photos.length; i++) {

  fragment.appendChild(renderPhotos(photos[i]));
}
PICTURE_CONTAINER.appendChild(fragment);

console.log(getArrayPhoto(25));
console.log(photos);
