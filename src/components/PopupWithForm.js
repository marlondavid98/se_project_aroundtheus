import { imageUrl } from "../utils/constants";
import Popup from "./Popup";
import UserInfo from "./UserInfo";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super( popupSelector );
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    
  
  }

  _getInputValues() {
    const name = document.querySelector("#title-image").value;
    const link = document.querySelector("#image-url").value;
    const data = { name, link };

    const profileTitle = document.querySelector(".js-profile-title");
    const profileDescription = document.querySelector(".js-profile-description");
    profileTitle.textContent = document.querySelector(".js-profile-modal-title").value;
    profileDescription.textContent = document.querySelector(
      ".js-profile-modal-description"
    ).value;
    
    return data;
    
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    })
  }    
  
  open(){
    super.open();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
