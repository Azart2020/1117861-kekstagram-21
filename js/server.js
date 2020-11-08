
'use strict';

(function () {
  const Url = {
    GET: `https://21.javascript.pages.academy/kekstagram/data`,
    POST: `https://21.javascript.pages.academy/kekstagram`
  };

  const Method = {
    GET: `GET`,
    POST: `POST`
  };

  const StatusCode = {
    OK: 200,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    NOT_AUTHORIZED: 401,
    INTERNAL_SERVER_ERROR: 500
  };

  const ErrorMessage = {
    400: `Неверный запрос`,
    401: `Пользователь не авторизован`,
    404: `Ничего не найдено`,
    500: `Ошибка сервера`
  };

  const TIMEOUT_IN_MS = 10000;

  const request = function (url, method, onSuccess, onError, data) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
        return;
      }

      const error = ErrorMessage[xhr.status]
        ? ErrorMessage[xhr.status]
        : `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;

      onError(error);
    });

    xhr.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    xhr.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);

    xhr.send(data);
  };

  const load = function (onSuccess) {
    request(Url.GET, Method.GET, onSuccess, window.serverMessage.renderLoadError);
  };

  const save = function (data, onSuccess) {
    request(Url.POST, Method.POST, onSuccess, window.serverMessage.renderSaveError, data);
  };

  window.server = {
    load,
    save
  };
})();
