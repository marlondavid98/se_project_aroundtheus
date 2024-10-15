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
    
  }

  getInitialCards(endUrl, options) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then(this._handleRequest);
  }

  deleteCard(endUrl, options) {
    return this._request(endUrl, options);
  }

  likeCard(endUrl, likeOptions) {
    return this._request(endUrl, likeOptions);
  }

  dislikeCard(endUrl, disLikeOptions) {
    return this._request(endUrl, disLikeOptions);
  }

  updateProfileInfo(endUrl, options) {
    return this._request(endUrl, options);
  }

  updateAvatar(endUrl, options) {
    return this._request(endUrl, options);
  }

  createNewCard(endUrl, options) {
    return this._request(endUrl, options)
  }
}

