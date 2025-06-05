// index.js
import './pages/index.css'; // добавьте импорт главного файла стилей
import { createCard, deleteCard, likeCard } from './components/card.js'
import { initialCards } from './components/cards.js';
import { openPopup, closePopup, setupPopupCloseHandlers  } from './components/modal.js';

// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list');

const editButton = content.querySelector('.profile__edit-button'); // Кнопка открытия попапа редактирования
const editPopup = document.querySelector('.popup_type_edit'); // Сам попап редактирования
const addButtonPopup = document.querySelector('.profile__add-button'); // Кнопка открытия попапа добавления 
const addPopup = document.querySelector('.popup_type_new-card'); // Эл-т попап добавления 

const closeButtons = document.querySelectorAll('.popup__close'); // Все кнопки закрытия попапа редактирования

const imagePopup = document.querySelector('.popup_type_image');
const popupImage = imagePopup.querySelector('.popup__image');
const popupCaption = imagePopup.querySelector('.popup__caption');

// Находим форму в DOM
const editFormElement = document.querySelector('form[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
const cardFormElement = document.querySelector('form[name="new-place"]'); 

// Находим поля ввода редактирования
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

// Находим поля формы в DOM
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');

const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardDescriptionInput = cardFormElement.querySelector('.popup__input_type_url');

// @todo: Вывести карточки на страницу                                   
function renderCard(cardElement, container) {
  container.append(cardElement);
}

initialCards.forEach(function(element){
  renderCard(createCard(element, deleteCard, likeCard, openImagePopup), placesList);
});

// @todo: обработчик на кнопку открытия попапа редактирования  
editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
})

// @todo: Обработчик на кнопку открытия попапа добавления 
addButtonPopup.addEventListener('click', function() {
  openPopup(addPopup);
})

// @todo: Функция открытия карточки через картинку
function openImagePopup (imageSrc, imageAlt, captionText) {
  popupImage.src = imageSrc;
  popupImage.alt = imageAlt;
  popupCaption.textContent = captionText;

  openPopup(imagePopup);
}

// @todo: Навешиваем обработчик на все кнопки закрытия
closeButtons.forEach(function(button){
  button.addEventListener('click', function() {
    const popup = button.closest('.popup');
    closePopup(popup);
  })
})

// Функция обработчик события "отправки" формы для редактирования
// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); 

  const newName = nameInput.value;
  const newDescription = descriptionInput.value;

  profileName.textContent = newName;
  profileDescription.textContent = newDescription;

  closePopup(editPopup);
}

editFormElement.addEventListener('submit', handleEditFormSubmit);

// @todo: Срабатывает функция закрытия через ESC для всех попапов
setupPopupCloseHandlers();

// @todo: Обработчик «отправки» формы
function handleCardFormSubmit(evt) {
  evt.preventDefault(); 

  const newCardName = cardNameInput.value;
  const newCardDescription = cardDescriptionInput.value;

  const addCard = {
    name: newCardName,
    link: newCardDescription
  }

  const createCardElement = createCard(addCard, deleteCard, likeCard, openImagePopup);
  placesList.prepend(createCardElement); 

  cardFormElement.reset();

  closePopup(addPopup);
}

cardFormElement.addEventListener('submit', handleCardFormSubmit);