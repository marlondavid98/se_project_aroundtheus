import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__button");
    this._handleFormSubmit = handleFormSubmit;

    this._btnText = this._submitBtn.textContent;
  }
  setEventListeners(card, cardId) {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._setButtonText();
      this._handleFormSubmit(card, cardId);
    });
  }

  _setButtonText() {
    const isFetching = useQuery('DELETE', fetchPost)
    const loadingText = "Deleting...";
    if (isFetching ) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._btnText;
    }
  }
}