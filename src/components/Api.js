export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(urlEnd, options) {
    return fetch(this._baseUrl+urlEnd, options)
    .then(this._handleRequest)
  }

  _handleRequest(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo(endUrl, options) {
    return this._request(endUrl,options);
    /*return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleRequest);*/
  }

  getInitialCards(endUrl, options) {
  //  return this._request(endUrl, options);
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleRequest);
  }

  deleteCard(endUrl, options) {
    return this._request(endUrl, options);
    /*
     return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleRequest);
  }*/
  }

  likeCard(cardId) {
    //return this._request(endUrl,method);
    console.log(this._headers);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._handleRequest);
  }

  dislikeCard(cardId) {
    //return this._request(endUrl,method);
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleRequest);
  }

  /*getAllinfo(){
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }*/

  updateProfileInfo(name, job) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: job,
      }),
    }).then(this._handleRequest);
  }

  updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then(this._handleRequest);
  }

  createNewCard(endUrl, method, data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleRequest);
  }
}

