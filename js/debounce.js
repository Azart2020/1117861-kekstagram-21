
'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;
  let lastTimeOut = 0;

  let setDebounce = function (cb) {
    if (lastTimeOut) {
      clearTimeout(lastTimeOut);
    }
    lastTimeOut = setTimeout(cb, DEBOUNCE_INTERVAL);
  };

  window.debounce = {
    setDebounce
  };

})();
