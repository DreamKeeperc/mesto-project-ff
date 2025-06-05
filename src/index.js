// index.js
import './pages/index.css'; // добавьте импорт главного файла стилей
import { createCard, deleteCard, renderCard, likeCard } from './components/card.js'
import { initialCards } from './components/cards.js';
import { openPopup, closePopup, setupPopupCloseHandlers  } from './components/modal.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const editButton = content.querySelector('.profile__edit-button'); // Кнопка открытия попапа редактирования
const editPopup = document.querySelector('.popup_type_edit'); // Сам попап редактирования
const closeEditButton = document.querySelectorAll('.popup__close'); // Кнопка закрытия попапа редактирования
const addButtonPopup = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления 
const addPopup = document.querySelector('.popup_type_new-card'); // Эл-т попап добавления 

// Находим форму в DOM
const formElement = document.querySelector('.popup__form'); // Воспользуйтесь методом querySelector()
const cardFormElement = document.querySelector('.popup_type_new-card .popup__form'); 

// Находим поля ввода редактирования
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим поля формы в DOM
const nameInput = formElement.querySelector('.popup__input_type_name');
const descriptionInput = formElement.querySelector('.popup__input_type_description');

const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardDescriptionInput = cardFormElement.querySelector('.popup__input_type_url');

initialCards.forEach(function(element){
  renderCard(createCard(element, deleteCard, likeCard), placesList);
});

editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

addButtonPopup.addEventListener('click', function() {
  openPopup(addPopup);
})

// @todo: Навешиваем обработчик на все кнопки закрытия
closeEditButton.forEach(function(button){
  button.addEventListener('click', function() {
    const popup = button.closest('.popup');
    closePopup(popup);
  })
})

// Функция обработчик события "отправки" формы для редактирования
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); 

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;
}

formElement.addEventListener('submit', handleFormSubmit);

setupPopupCloseHandlers();

function handleCardFormSubmit(evt) {
  evt.preventDefault(); 

  const newCardName = cardNameInput.value;
  const newCardDescription = cardDescriptionInput.value;

  const addCard = {
    name: newCardName,
    link: newCardDescription
  }

  const createCardElement = createCard(addCard, deleteCard, likeCard);
  placesList.prepend(createCardElement); 

  cardFormElement.reset();
  closePopup(cardFormElement.closest('.popup'));
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);