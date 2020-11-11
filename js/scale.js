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

  const changeSize = function () {
    imgEditorPreview.style.transform = `scale(` + scaleValue / 100 + `)`;
    scaleControlValue.value = scaleValue + `%`;
  };

  scaleControlSmaller.addEventListener(`click`, function () {
    if (scaleValue > Scale.MIN) {
      scaleValue = scaleValue - Scale.STEP;
      changeSize();
    }
  });

  scaleControlBigger.addEventListener(`click`, function () {
    if (scaleValue < Scale.MAX) {
      scaleValue = scaleValue + Scale.STEP;
      changeSize();
    }
  });

})();
