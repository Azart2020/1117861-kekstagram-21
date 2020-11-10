'use strict';
(function () {
  const ESCAPE = `Escape`;

  const isEscape = function (evt) {
    return evt.key === ESCAPE;
  };

  const DEBOUNCE_INTERVAL = 500;

  const setDebounce = function (fn, interval = DEBOUNCE_INTERVAL) {
    let lastTimeout = null;

    const debounced = function (...elements) {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(function () {
        fn(...elements);
      }, interval);
    };

    return debounced;
  };
  window.utils = {
    isEscape,
    setDebounce
  };
})();
