
'use strict';

(function () {


  const MESSAGES = [
    `Всё отлично!`,
    `В целом всё неплохо. Но не всё.`,
    `Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
    `Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
    `Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
    `Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`,
  ];

  const NAMES = [
    `Гарольд`,
    `Ванс`,
    `Жозеф`,
    `Брунгильда`,
    `Ефросиния`,
    `Дарио`,
    `Нестор`,
    `Ада`,
  ];
  const getRandomAvatar = function () {
    return `img/avatar-` + window.data.getRandomNumber(1, 6) + `.svg`;
  };
  const getRandomComment = function () {
    return {
      avatar: getRandomAvatar(),
      message: window.data.getRandomElement(MESSAGES),
      name: window.data.getRandomElement(NAMES),
    };
  };
  window.comments = {
    getRandomComment,
    getRandomAvatar
  };
})();
