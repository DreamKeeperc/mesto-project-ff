// @todo: Функция создания карточки
function createCard(element, deleteCard, likeCard, openImagePopup) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const cardImage = cardElement.querySelector('.card__image');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__title').textContent = element.name;
  cardImage.src = element.link;
  cardImage.alt = element.name;

  deleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });

  likeButton.addEventListener('click', function() {
    likeCard(likeButton);
  });

  cardImage.addEventListener('click', function() {
    openImagePopup(element.link, element.name, element.name);
  });

  return cardElement;
}  

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};

// @todo: Функция лайка карточки
function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };