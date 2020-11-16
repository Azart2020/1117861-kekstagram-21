"use strict";

const COMMENTS_AMOUNT = 5;
const renderComment = (comment) => {
  const commentElement = document.createElement(`li`);
  commentElement.classList.add(`social__comment`);

  const img = document.createElement(`img`);
  img.classList.add(`social__picture`);
  img.src = comment.avatar;
  img.alt = comment.name;
  commentElement.appendChild(img);

  const commentText = document.createElement(`p`);
  commentText.classList.add(`social__text`);
  commentText.textContent = comment.message;
  commentElement.appendChild(commentText);

  return commentElement;
};
const renderComments = (comments) => {
  const fragment = document.createDocumentFragment();
  comments.forEach(function (comment) {
    const commentElement = renderComment(comment);
    fragment.appendChild(commentElement);
  });
  return fragment;
};

const renderCommentsSlice = (comments, parent, from, count = COMMENTS_AMOUNT) => {
  const slicedComments = comments.slice(from, from + count);
  const commentsFragment = renderComments(slicedComments);
  parent.appendChild(commentsFragment);
  return from + count < comments.length;
};

const updateButtonVisibility = (button, state) => {
  return state
    ? button.classList.remove(`hidden`)
    : button.classList.add(`hidden`);
};
window.comments = {
  renderCommentsSlice,
  updateButtonVisibility
};

