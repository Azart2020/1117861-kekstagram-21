'use strict';
(function () {
  window.server.loads(function (photos) {
    window.renderPhoto.renderPictures(photos);
  });
})();
