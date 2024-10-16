export default class Card {
  constructor(
    data,
    cardSelector,
    handleImgClick,
    handleDeleteClick,
    handleLikeClick, 
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
    this._cardImg = this._cardElement.querySelector(".card__image");
    this._cardElement.querySelector(".card__text").textContent = this._name;
    this._cardImg.src = this._link;
    this._cardImg.alt = this._name;

    this._likeBtn = this._cardElement.querySelector(".card__like-button");
    this._deleteBtn = this._cardElement.querySelector(".card__trash-button");

    this._updateLikeStatus();

    this._setEventListeners();

    return this._cardElement;
  }

  generateCard() {
    this._setEventListeners();
    return this._element;
  }

  _getTemplate() {
    return this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _setEventListeners() {

    this._likeBtn.addEventListener("click", () => {
      this._handleLikeClick(this, this._id, this._isLiked);
      console.log(this._likeBtn);
      
    });
    this._deleteBtn.addEventListener("click", () => {
      this._handleDeleteClick(this, this._id);
    });
    this._cardImg.addEventListener("click", () => {
      this._handleImgClick(this._data);
    });
  }


  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  updateLikes() {
    this._likeBtn.classList.toggle("card__like-button_active");
    console.log(this._likeBtn);
  }

  /*
  _isLikedbyUser() {
    return this._likes.some((like) => like._id === this._userId);
  }
*/
  _updateLikeStatus() {
    if (this._isLiked) {
      this._likeBtn.classList.add("card__like-button_active");
    } else {
      this._likeBtn.classList.remove("card__like-button_active");
    }
  }
}
