import Popup from "./Popup";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popupElement.querySelector(".modal__img-expand");
    this._name = this._popupElement.querySelector(".modal__name-title");
  }

  open(data) {
    console.log(data);
    this._image.src = data.link;
    this._image.alt = data.name;
    this._name.textContent = data.name;
    super.open();
  }

  close() {
    this._image.src = "";
    this._image.alt = "";
    this._name.textContent = "";
    super.close();
  }
}
