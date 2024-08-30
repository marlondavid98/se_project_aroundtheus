import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";

const ESC_KEYCODE = 27;

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

const cardList = document.querySelector(".js-card-list");

//buttons
const profileEditBtn = document.querySelector(".js-profile-edit-button");
const addNewCardBtn = document.querySelector(".profile__add-button");
const closeButtons = document.querySelectorAll('.modal__close');

//DOM
const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");

//modals
const profileEditModal = document.querySelector(".js-profile-edit-modal");
const newCardModal = document.querySelector(".js-new-card-modal");
const expandImgModal = document.querySelector(".js-expand-img-modal");

//forms
const profileEditForm = document.forms.profileform;
const newCardAddForm = document.forms.newcardform;

// forms inputs
const titleInput = document.querySelector(".js-profile-modal-title");
const descriptionInput = document.querySelector(
  ".js-profile-modal-description"
);
const imageTitle = document.querySelector("#title-image");
const imageUrl = document.querySelector("#image-url");

//validation
const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, newCardAddForm);


editFormValidator.enableValidation();
addFormValidator.enableValidation();

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

const disableSubmitBtn = new FormValidator(validationSettings, profileEditForm);

function submitProfile(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
  disableSubmitBtn.disableBtn();
}

function submitNewCard(e) {
  e.preventDefault();
  createNewCard()
  e.target.reset();
  closeModal(newCardModal);
  disableSubmitBtn.disableBtn();
}

function createNewCard() {
  const name = imageTitle.value;
  const link = imageUrl.value;
  const data = { name, link };
  const newCard = new Card (data, cardSelector).generateCard();
  cardList.prepend(newCard);
}

function createCard(data){
  const mainCards = new Card(data, cardSelector).generateCard();
  return mainCards;
}

profileEditBtn.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});
profileEditForm.addEventListener("submit", submitProfile);
addNewCardBtn.addEventListener("click", () => openModal(newCardModal));

newCardAddForm.addEventListener("submit", submitNewCard);


const cardSelector = "#card-template";
//render
initialCards.forEach((data) => {
  const card = createCard(data);
  cardList.append(card);
});


const modalList = document.querySelectorAll(".modal");

modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});
