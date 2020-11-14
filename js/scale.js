'use strict';
(function () {

  const scale = document.querySelector(`.scale`);
  const scaleControlSmaller = scale.querySelector(`.scale__control--smaller`);
  const scaleControlBigger = scale.querySelector(`.scale__control--bigger`);
  const scaleControlValue = scale.querySelector(`.scale__control--value`);
  const imgEditorPreview = document.querySelector(`.img-upload__preview img`);

  const Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100,
    DEFAULT: 100
  };
  let scaleValue = Scale.DEFAULT;

  const changeSize = function (value) {
    imgEditorPreview.style.transform = `scale(` + value / 100 + `)`;
    scaleControlValue.value = value + `%`;
    scaleValue = value;
  };

  scaleControlSmaller.addEventListener(`click`, function () {
    if (scaleValue > Scale.MIN) {
      changeSize(scaleValue - Scale.STEP);
    }
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (scaleValue < Scale.MAX) {
      changeSize(scaleValue + Scale.STEP);
    }
  });
  const reset = function () {
    changeSize(Scale.DEFAULT);
  };

  window.scale = {
    reset
  };

})();
