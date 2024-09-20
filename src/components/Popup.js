export default class Popup {
  constructor( popupSelector ) {
    this._popupElement = popupSelector;
  }

  open() {
    this._popupElement.classList.add("modal_opened");
  }

  close() {
    console.log("working")
    this._popupElement.classList.remove("modal_opened");
  }

  _handleEscClose = (e) => {
    if (e.key === 'Escape') {
      this.close();
    }
    //this.close();
  }

  setEventListeners() {
    const closeBtn = this._popupElement.querySelector(".modal__close");
    closeBtn.addEventListener("click", () => {
      this.close();
    });

    document.addEventListener("keydown", this._handleEscClose);

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
