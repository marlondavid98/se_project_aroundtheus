const expandImgModal = document.querySelector(".js-expand-img-modal");

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEscape);
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEscape);
}

function closeModalByEscape(e) {
  if (e.key === "Escape") {
    const currentModal = document.querySelector(".modal_opened");
    closeModal(currentModal);
  }
}

class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    console.log(this._cardSelector);
    this._element
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  } 

  _handleLikeBtn() {
    this._element
      .classList.toggle("card__like-button_active");
  }

  _handleTrashBtn() {
    cardElement.remove(data);
  }

  _handlePreviewImg() {
    const expandedImg = expandImgModal.querySelector(".modal__img-expand");
    const expandedImgText = expandImgModal.querySelector(".modal__name-title");
    expandedImg.src = this._link;
    expandedImg.alt = this._name;
    expandedImgText.textContent = this._name;
    openModal(expandImgModal);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => this._handleLikeBtn);

    this._element
      .querySelector(".card__trash-button")
      .addEventListener("click", () => this._handleTrashBtn);

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handlePreviewImg);
  }

  generateCard() {
    this._element = this._getTemplate();
    console.log(this._element);
    this._setEventListeners();

    this._element.quarySelector(
      ".card__image"
    ).style.backgroundImage = `url(${this._link})`;
    this._element.querySelector(".card__text").textContent = this._name;
    return this._element;
  }
}

export default Card;
