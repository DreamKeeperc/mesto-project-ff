const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-42',
  headers: {
    authorization: '2f16295e-ab4c-4d0e-97cc-2aa34a00692b',
    'Content-Type': 'application/json'
  }
};

function checkResponse(res) {
    if(res.ok) {
      return res.json();
    }  
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserInfo() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then(checkResponse);
}

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then(checkResponse)
}

function editProfile(name, about) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
  .then(checkResponse);
}

function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
        name: name,
        link: link
    })
  })
  .then(checkResponse);
}

function handleServerDelete(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(checkResponse);
}

function toggleLike(cardId, isLiked) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: config.headers
  })
  .then(checkResponse);
}

function updateUserAvatar (avatar) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatar
  })
  })
  .then(checkResponse);
}

export { getUserInfo, getInitialCards, editProfile, addNewCard, handleServerDelete, toggleLike, updateUserAvatar };