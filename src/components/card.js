import { openPopup, closePopup } from './modal.js';

// @todo: Функция создания карточки
function createCard(element, deleteCard, likeCard) {
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

  cardImage.addEventListener('click', function(){
    const imagePopup = document.querySelector('.popup_type_image');
    const popupImage = imagePopup.querySelector('.popup__image');
    const popupCaption = imagePopup.querySelector('.popup__caption');

    popupImage.src = element.link;
    popupImage.alt = element.name;
    popupCaption.textContent = element.name;

    openPopup(imagePopup);
  });

  return cardElement;
}  

// @todo: Функция удаления карточки
function deleteCard(cardElement) {
  cardElement.remove();
};

// @todo: Вывести карточки на страницу                                   
function renderCard(cardElement, container) {
  container.append(cardElement);
}

function likeCard(likeButton) {
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, renderCard, likeCard };