import { handleServerDelete, toggleLike } from "./api";

// @todo: Функция создания карточки
function createCard(element, currentUserId, deleteCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');
  const likesCounterElement = cardElement.querySelector('.like-box');

  cardElement.querySelector('.card__title').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  likesCounterElement.textContent = element.likes.length;

  const isLiked = element.likes.some(like => like._id === currentUserId);
  likeButton.classList.toggle('card__like-button_is-active', isLiked);
 

  if(element.owner._id === currentUserId) {
    deleteButton.addEventListener('click', function() {
      deleteCard(element._id, cardElement, handleServerDelete);
  });
  } else {
        deleteButton.style.display = 'none';
  }

  likeButton.addEventListener('click', function() {
      likeCard(likeButton, toggleLike, element._id, currentUserId, likesCounterElement);
  });

  cardImage.addEventListener('click', function() {
    openImagePopup(element.link, element.name, element.name);
  });

  return cardElement;
}  

// @todo: Функция удаления карточки
function deleteCard(cardId, cardElement, handleServerDelete) {
  handleServerDelete(cardId)
    .then(() => {
      cardElement.remove();
    })
};

function likeCard(likeButton, toggleLike, cardId, currentUserId, likesCounterElement) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  toggleLike(cardId, isLiked)
   .then((res) => {
    const likes = res.likes.map((card) => card._id);
    const newIsLiked = likes.includes(currentUserId);
    likeButton.classList.toggle('card__like-button_is-active', newIsLiked);
    likesCounterElement.textContent = res.likes.length;
   })
   .catch((err) => {
    console.error('Ошибка при лайке:', err);
  });
}

export { createCard, deleteCard, likeCard }