export default class Popup {
  constructor( popupSelector ) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(e) {
    if (e.key === 'Escape') {
      console.log("hey");
      this.close();
    }
    this.close();
  }

  setEventListeners() {
    const closeBtn = this._popupElement.querySelector(".modal__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });

    const modalList = document.querySelectorAll(".modal");
    modalList.forEach((modal) => {
      modal.addEventListener("mousedown", (e) => {
        if (e.target.classList.contains("modal")) {
          this.close();
        }
      });
    });
  }
}
