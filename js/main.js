'use strict';
(function () {
  window.server.load(function (photos) {
    window.filters.runFilter(photos);
  });
})();
