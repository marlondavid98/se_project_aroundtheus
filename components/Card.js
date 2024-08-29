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
    console.log(data);
    this._name = data.name;
    this._link = data.link;

    this._cardSelector = cardSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector(".card__image").src = this._link;
    this._element.querySelector(".card__text").textContent = this._name;
    return this._element;
  }

  _getTemplate() {
    //console.log(this._cardSelector);
    //console.log(this._element);
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  /*_handleLikeBtn() {
    console.log(this._element.querySelector(".card__like-button"));
    this._element.classList.toggle("card__like-button_active");
  }

  _handleTrashBtn() {
    cardElement.remove(data);
  }

  _handlePreviewImg() {
    console.log("hello");
    const expandedImg = expandImgModal.querySelector(".modal__img-expand");
    const expandedImgText = expandImgModal.querySelector(".modal__name-title");
    expandedImg.src = this._link;
    expandedImg.alt = this._name;
    expandedImgText.textContent = this._name;
    openModal(expandImgModal);
  }*/

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

    cardImg.addEventListener("click", () => {
      const expandedImg = expandImgModal.querySelector(".modal__img-expand");
      const expandedImgText =
        expandImgModal.querySelector(".modal__name-title");
      expandedImg.src = this._link;
      expandedImg.alt = this._name;
      expandedImgText.textContent = this._name;
      openModal(expandImgModal);
    });
  }
}

export default Card;
