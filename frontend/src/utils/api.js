import { _checkResponse, BASE_URL } from './utils';

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  /// получение карточек с сервера
  getInitialCards(jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      }
    }).then((res) => _checkResponse(res));
  }

   /// получаем данные о пользователе
   getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      headers: this._headers,
    }).then((res) => _checkResponse(res));
  }

  /// редактирование данных о пользователе
  editUserData(data, jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => _checkResponse(res));
  }

  /// добавляем новую карточку попапом
  addItem(data, jwt) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => _checkResponse(res));
  }

 /// удаляем карточку
  deleteItem(itemId, jwt) {
    return fetch(`${this._baseUrl}/cards/${itemId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }).then((res) => _checkResponse(res));
  }

  /// ставим.снимаем лайк на карточке
  changeLikeCardStatus(itemId, isLiked, jwt) {
    return fetch(`${this._baseUrl}/cards/${itemId}/likes`, {
      credentials: 'include',
      method: `${!isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    }).then((res) => _checkResponse(res));
  }

  /// редактирование аватара пользователя
  changeAvatar(data, jwt) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => _checkResponse(res));
  }
}

const api = new Api({
  baseUrl: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
  },
});

export default api;
