'use strict';
(function () {
  const ESCAPE = `Escape`;

  const isEscape = function (evt) {
    return evt.key === ESCAPE;
  };

  window.utils = {
    isEscape
  };
})();
