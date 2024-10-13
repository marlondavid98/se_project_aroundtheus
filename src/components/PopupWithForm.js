import Popup from "./Popup";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;

    this._submitBtn = this._popupElement.querySelector(".modal__button");
    this._buttonText = this._submitBtn.textContent;
  }

  _getInputValues() {
    const inputList = this._popupForm.querySelectorAll(".modal__input");
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._popupForm.reset();
    });
  }

  setButtonText(isFetching) {
    const loadingText = "Saving...";
    if (isFetching) {
      this._submitBtn.textContent = loadingText;
    } else {
      this._submitBtn.textContent = "Save";
    }
  }
}
