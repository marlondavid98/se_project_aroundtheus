export default class Card {
  constructor(
    data,
    cardSelector,
    handleImgClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._handleImgClick = handleImgClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
    this._cardSelector = cardSelector;
    this._data = data;
    this._element = this._getTemplate();

  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardElement.querySelector(".card__image").src = this._link;
    this._cardElement.querySelector(".card__image").alt = this._name;

    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__trash-button");
    this._cardImg = this._cardElement.querySelector(".card__image");

    this._updateLikeStatus();

    this._setEventListeners();

    return this._cardElement;
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
      this._handleDeleteClick(this._id);
    });
    this._cardImg.addEventListener("click", () => {
      this._handleImgClick(this._data);
    });
  }

  updateLikes() {
    this._likeBtn.classList.toggle(".card__like-button_active");
  }

  /*
  _isLikedbyUser() {
    return this._likes.some((like) => like._id === this._userId);
  }
*/
  _updateLikeStatus() {
    const likeButton = this._cardElement.querySelector(".card__like-button");

    if (this._isLiked) {
      likeButton.classList.add("card__like-button_active");
    } else {
      likeButton.classList.remove("card__like-button_active");
    }
  }
  
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }
}
