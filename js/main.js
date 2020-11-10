'use strict';
(function () {
  window.server.load(function (photos) {
    window.renderPhoto.renderPictures(photos);
  });
})();
