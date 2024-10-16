export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _request(urlEnd,options ={}){
    const finalOptions = {
      headers: this._headers,
      ...options,
    }

    const url = `${this._baseUrl}${urlEnd}`;
    return fetch(url, finalOptions).then(this._handleRequest);
  }

  _handleRequest(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return this._request("/users/me", {method: "GET"})
  }

  getInitialCards() {
    return this._request(`/cards`, {method: "GET"})
  }

  deleteCard(cardId) {
    return this._request("/cards/"+cardId, {method: "DELETE"})
  }

  likeCard(cardId) {
    return this._request("/cards/"+cardId+"/likes", {method: "PUT"})
  }

  dislikeCard(cardId) {
    return this._request("/cards/"+cardId+"/likes", {method: "DELETE"})
  }

  updateProfileInfo(newName, newJob) {
    return this._request("/users/me", {method: "PATCH", body: JSON.stringify({
      name: newName, 
      about: newJob
    }) })
  }

  updateAvatar(link) {
    return this._request("/users/me/avatar", {method: "PATCH",body: JSON.stringify({
      avatar: link,
    })})
  }

  createNewCard(formInputs) {
   return this._request("/cards", {method:"POST", body: JSON.stringify(formInputs)})
  }
}

