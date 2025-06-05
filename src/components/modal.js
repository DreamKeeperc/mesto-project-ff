// @todo: Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_is-opened');
  popupElement.classList.add('popup_is-animated');
  document.addEventListener('keydown', handleEscapeKey);
}

// @todo: Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  popupElement.classList.add('popup_is-animated');
  document.removeEventListener('keydown', handleEscapeKey);
}

// @todo: Функция закрытия попапа по нажатия на ESC 
function handleEscapeKey(evt) {
  if(evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if(openedPopup) {
      closePopup(openedPopup);
    }
  }
}

// @todo: Функция-обработчик клика по оверлею 
function handleOverlayClick (evt) {
  if (evt.currentTarget === evt.target) {
    closePopup(evt.currentTarget);
  }
}

// @todo: Навешиваем обработчики на все попапы
function setupPopupCloseHandlers() {
  const popup = document.querySelectorAll('.popup');

  popup.forEach(function(popup) {
    popup.addEventListener('mousedown', handleOverlayClick); // Закрытие по клику на оверлей
  })
  
  // Глобальный обработчик Esc
  document.addEventListener('keydown', handleEscapeKey);
}

export { openPopup, closePopup, setupPopupCloseHandlers }