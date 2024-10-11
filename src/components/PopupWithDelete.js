import Popup from "./Popup";

export default class PopupWithDelete extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._submitBtn = this._popupElement.querySelector(".modal__button");
    this._btnText = this._submitBtn.textContent;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this_popupElement.remove();
    });
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setButtonText(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = this._btnText;
    }
  }
}
