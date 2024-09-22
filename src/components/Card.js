export default class Card {
  constructor(data, cardSelector, handleImgClick) {
    this._name = data.name;
    this._link = data.link;

    this._handleImgClick = handleImgClick;
    this._data = data;

    this._cardSelector = cardSelector;

    this._element = this._getTemplate();
    this._likeBtn = this._element.querySelector(".card__like-button");
    this._deleteBtn = this._element.querySelector(".card__trash-button");
    this._cardImg = this._element.querySelector(".card__image");
  }

  generateCard() {
    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;

    this._likeBtn.addEventListener("click", () => {
      this._likeBtn.classList.toggle("card__like-button_active");
    });

    this._deleteBtn.addEventListener("click", () => {
      this._element.remove();
    });

    this._cardImg.addEventListener("click", () => {
      this._handleImgClick(this._data);
    });
  }
}
