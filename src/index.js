// index.js
import './pages/index.css'; // добавьте импорт главного файла стилей
import { createCard, deleteCard, likeCard } from './components/card.js'
/* import { initialCards } from './components/cards.js';*/
import { openPopup, closePopup, setupPopupCloseHandlers  } from './components/modal.js';
import { enableValidation, clearValidation } from './components/validation.js';
import { getUserInfo, getInitialCards, editProfile, addNewCard, updateUserAvatar } from './components/api.js';

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

const avatarPopup = document.querySelector('.popup_type_profile_image');

// Находим форму в DOM
const editFormElement = document.querySelector('form[name="edit-profile"]'); // Воспользуйтесь методом querySelector()
const cardFormElement = document.querySelector('form[name="new-place"]'); 
const avatarFormElement = document.querySelector('form[name="update-avatar"]');

// Находим поля ввода редактирования
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

// Находим поля формы в DOM
const nameInput = editFormElement.querySelector('.popup__input_type_name');
const descriptionInput = editFormElement.querySelector('.popup__input_type_description');

const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardDescriptionInput = cardFormElement.querySelector('.popup__input_type_url');

const cardAvatarInput = avatarFormElement.querySelector('.popup__input_type_url_avatar');

// включение валидации вызовом enableValidation, все настройки передаются при вызове:
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// @todo: Вывести карточки на страницу      
function renderCard(cardElement, container) {
  container.append(cardElement);
}

Promise.all([getUserInfo(), getInitialCards()])
  .then(([userData, cards]) => {
    console.log('Данные карточек:', cards); // ← Добавьте эту строку
    // Обновляем профиль
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = `url(${userData.avatar})`;
   
    const currentUserId = userData._id;

    // @todo: Функция открытия попапа через картинку 
    function openAvatarPopup() { 
      clearValidation(avatarFormElement, {
        formSelector: '.popup__form',
        inputSelector: '.popup__input',
        submitButtonSelector: '.popup__button',
        inactiveButtonClass: 'popup__button_disabled',
        inputErrorClass: 'popup__input_type_error',
        errorClass: 'popup__error_visible'
      });
      openPopup(avatarPopup);
    }

    profileImage.addEventListener('click', openAvatarPopup);

       function handleAvatarFormSubmit(evt) {
        evt.preventDefault();

        const avatarUrl = cardAvatarInput.value;
        const submitButton = evt.target.querySelector('.popup__button');
        const defaultButtonText = submitButton.textContent;

        updateUserAvatar(avatarUrl)
          .then(() => {
            submitButton.textContent = 'Сохранение...';
            return updateUserAvatar(avatarUrl);
          })
          .then((res) => {
            profileImage.style.backgroundImage = `url(${res.avatar})`;
            closePopup(avatarPopup);
            avatarFormElement.reset();
          })
          .catch((err) => {
            console.error('Ошибка:', err);
          })
          .finally(() => {
            submitButton.textContent = defaultButtonText;
            submitButton.disabled = false;
          });
        }
    
    avatarFormElement.addEventListener('submit', handleAvatarFormSubmit);

    // @todo: Обработчик «отправки» формы для добавления карточки 
    function handleCardFormSubmit(evt) {
      evt.preventDefault(); 
      const submitButton = evt.target.querySelector('.popup__button');
      const defaultButtonText = submitButton.textContent;
      submitButton.textContent = 'Сохранение...';
      submitButton.disabled = true;

      addNewCard(cardNameInput.value, cardDescriptionInput.value)
        .then((card) => {
          placesList.prepend(createCard(card, currentUserId, deleteCard, likeCard, openImagePopup));
          closePopup(addPopup);
          cardFormElement.reset();
        })
        .catch((err) => {
          console.error('Ошибка при загрузке данных:', err);
        })
        .finally(() => {
          submitButton.textContent = defaultButtonText;
          submitButton.disabled = false;
        })
    }

    cardFormElement.addEventListener('submit', handleCardFormSubmit);
    
    // Отрисовываем карточки
    cards.forEach(card => {
      renderCard(createCard(card, currentUserId, deleteCard, likeCard, openImagePopup), placesList);
    });
  })
  .catch(err => {
    console.error('Ошибка при загрузке данных:', err);
  });

// @todo: обработчик на кнопку открытия попапа редактирования  
editButton.addEventListener('click', function() {
  openPopup(editPopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(editFormElement, {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  })
})

// @todo: Обработчик на кнопку открытия попапа добавления 
addButtonPopup.addEventListener('click', function() {
  openPopup(addPopup);
  clearValidation(cardFormElement , {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });
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

  const submitButton = evt.target.querySelector('.popup__button');
  const defaultButtonText = submitButton.textContent;
  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  editProfile(nameInput.value, descriptionInput.value)
    .then((userData) => {
      profileName.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closePopup(editPopup);
    })
    .catch ((err) => {
      console.error('Ошибка при загрузке данных:', err);
    })
    .finally(() => {
      submitButton.textContent = defaultButtonText;
      submitButton.disabled = false;
    })
}

editFormElement.addEventListener('submit', handleEditFormSubmit);

// @todo: Срабатывает функция закрытия через ESC для всех попапов
setupPopupCloseHandlers();
