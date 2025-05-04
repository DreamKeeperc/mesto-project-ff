// @todo: Темплейт карточки
/* <template id="card-template">
  <li class="places__item card">
    <img class="card__image" src="" alt="" />
    <button type="button" class="card__delete-button"></button>
    <div class="card__description">
      <h2 class="card__title">
      </h2>
      <button type="button" class="card__like-button"></button>
    </div>
  </li>
</template>
*/ 
// @todo: DOM узлы
const content = document.querySelector('.content');
const placesList = content.querySelector('.places__list')
const addButton = content.querySelector('.profile__add-button');

// @todo: Функция создания карточки
  function addCard(element, deleteCard) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    const deleteButton = cardElement.querySelector('.card__delete-button');

    cardElement.querySelector('.card__title').textContent = element.name;
    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;

    deleteButton.addEventListener('click', function() {
      deleteCard(cardElement);
    });
  
    return cardElement;
  }  


// @todo: Функция удаления карточки
  function deleteCard(cardElement) {
    cardElement.remove();
  };

// @todo: Вывести карточки на страницу

function renderCard(cardElement) {
  placesList.append(cardElement);
}

initialCards.forEach(function(element){
  renderCard(addCard(element, deleteCard));
});