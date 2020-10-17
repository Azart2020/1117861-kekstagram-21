'use strict';

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
const DESCRIPTION = [
  'Тестим новую камеру! =)',
  'Первый опыт в фотографии',
  'Теплые воспоминания',
  'Редкий кадр',
  'То что меня вдохновляет'
];

const Count = {
  PHOTOS: 25,
  LIKES_MIN: 15,
  LIKES_MAX: 200,
  COMMENTS: 2
};

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const getRandomPhotos = function (count) {
  const pictures = [];
  for (let i = 0; i < count; i++) {
    const picture = getRandomDescription(i);
    pictures[i] = picture;
  }

  return pictures;
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

const getPhoto = function (number) {
  return 'photos/' + (number + 1) + '.jpg';
};

const getTextPhoto = function () {
  return getRandomElement(DESCRIPTION);
};

const getRandomIndex = function (elements) {
  return getRandomNumber(0, elements.length - 1);
};

const getRandomAvatar = function () {
  return 'img/avatar-' + getRandomNumber(1, 6) + '.svg';
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
    avatar: getRandomAvatar(),
    message: getRandomElement(MESSAGES),
    name: getRandomElement(NAMES)
  };
};

const getRandomDescription = function (number) {
  return {
    url: getPhoto(number),
    description: getTextPhoto(),
    likes: getRandomNumber(Count.LIKES_MIN, Count.LIKES_MAX),
    comments: getAmountComment(Count.COMMENTS)
  };
};

const renderPictures = function (pictures) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pictures.length; i++) {
    const picture = pictures[i];
    const pictureElement = renderPicture(picture);
    fragment.appendChild(pictureElement);
  }
  picturesContainer.appendChild(fragment);
};

const renderPicture = function (picture) {
  const pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

const photos = getRandomPhotos(Count.PHOTOS);

renderPictures(photos);

const mainPicture = document.querySelector('.big-picture');

const removeChildren = function (element) {
  while (element.firstChild) {
    element.firstChild.remove();
  }
};
const createComment = function (comment) {
  const commentElement = document.createElement('li');
  commentElement.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = comment.avatar;
  img.alt = comment.name;
  commentElement.appendChild(img);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  commentElement.appendChild(commentText);

  return commentElement;
};


const createComments = function (comments) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < comments.length; i++) {
    const commentElement = createComment(comments[i]);
    fragment.appendChild(commentElement);
  }
  return fragment;
};

const showBigPicture = function (photo) {
  document.body.classList.add('modal-open');
  mainPicture.classList.remove('hidden');

  mainPicture.querySelector('.big-picture__img img').src = photo.url;
  mainPicture.querySelector('.likes-count').textContent = photo.likes;
  mainPicture.querySelector('.comments-count').textContent = photo.comments.length;
  mainPicture.querySelector('.social__caption').textContent = photo.description;
  mainPicture.querySelector('.social__picture').alt = photo.name;
  const commentsContainer = mainPicture.querySelector('.social__comments');

  const socialElement = mainPicture.querySelector('.social__comments');
  removeChildren(socialElement);

  commentsContainer.appendChild(
      createComments(photo.comments)
  );

  const commentCount = document.querySelector('.social__comment-count');
  const commentLoad = document.querySelector('.comments-loader');
  commentCount.classList.add('hidden');
  commentLoad.classList.add('hidden');
};
showBigPicture(photos[8]);
