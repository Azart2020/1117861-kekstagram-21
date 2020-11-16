'use strict';
const ESCAPE = `Escape`;
const DEBOUNCE_INTERVAL = 500;
const isEscape = (evt) => evt.key === ESCAPE;

const setDebounce = (fn, interval = DEBOUNCE_INTERVAL) => {
  let lastTimeout = null;

  const debounced = (...elements) => {
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
