export default class Card {
  constructor(data, cardSelector, handleImgClick) {
    this._name = data.name;
    this._link = data.link;

    this._handleImgClick = handleImgClick;
    this._data = data;

    this._cardSelector = cardSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__image").alt = this._name;
    this._element.querySelector(".card__text").textContent = this._name;
    return this._element;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {
    const likeBtn = this._element.querySelector(".card__like-button");
    const deleteBtn = this._element.querySelector(".card__trash-button");
    const cardImg = this._element.querySelector(".card__image");

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("card__like-button_active");
    });

    deleteBtn.addEventListener("click", () => {
      this._element.remove(this._link, this._name);
    });

    cardImg.addEventListener("click", () => {
      this._handleImgClick(this._data);
    });
  }
}

