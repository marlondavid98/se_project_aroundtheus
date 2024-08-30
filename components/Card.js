class Card {
  constructor(data, cardSelector) {
    console.log(data);
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
    this._expandImgModal = document.querySelector(".js-expand-img-modal");
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
    console.log(cardImg);

    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("card__like-button_active");
    });

    deleteBtn.addEventListener("click", () => {
      this._element.remove(this._link, this._name);
    });

    cardImg.addEventListener("click", () => this._handleImgClick());
  }

  _handleImgClick(e) {
    const expandImgModal = document.querySelector(".js-expand-img-modal");

    const expandedImg =
      this._expandImgModal.querySelector(".modal__img-expand");
    const expandedImgText = expandImgModal.querySelector(".modal__name-title");
    expandedImg.src = this._link;
    expandedImg.alt = this._name;
    expandedImgText.textContent = this._name;

    expandImgModal.classList.add("modal_opened");
    document.addEventListener("keyup", (e) => {
      if(e.key === "Escape"){
        expandImgModal.classList.remove("modal_opened");
      }
    });
  }
}

export default Card;
