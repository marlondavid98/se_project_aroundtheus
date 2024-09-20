//IMPORTS

import * as constants from "../utils/constants.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

//SECTION.JS

const cardGeneration = new Section(
  {
    items: constants.initialCards,
    renderer: (item) => {
      const cardElement = createCard(item);
      cardGeneration.addItem(cardElement);
    },
  },
  constants.cardList // passing the already selected DOM element
);
cardGeneration.renderItems()

//CARD.JS 

function createCard(data){
  const cardElement = new Card(data, constants.cardSelector,handlePreviewImage).generateCard();
  return cardElement;
}

//USER INFO

const userInformation = new UserInfo(constants.profileTitle, constants.profileDescription);

//EDIT PROFILE POPUPWITHFORM.JS

const editProfile = new PopupWithForm(constants.profileEditModal, (data) => {
  userInformation.setUserInfo(data);
  editProfile.close();
});

editProfile.setEventListeners();

//OPEN PROFILE EDIT MODAL

constants.profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInformation.getUserInfo();
  constants.profileTitle.value = name;
  constants.profileDescription.value = job;

  editProfile.open();
  editProfileFormValidator._toggleButtonState();
});



//ADD CARD POPUPWITHFORM.JS

const newCardPopup = new PopupWithForm(constants.newCardModal, (data) => {
  cardGeneration.addItem(createCard(data));
  newCardPopup.close();
});

newCardPopup.setEventListeners();

//OPEN ADD CARD MODAL

constants.addNewCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  addCardFormValidator._toggleButtonState();
});

//POPUPWITHIMAGE.JS

const imagePopup = new PopupWithImage(constants.expandImgModal);
imagePopup.setEventListeners();

function handlePreviewImage(data){
  imagePopup.open(data);
}

//FORMVALIDATOR.JS

const editProfileFormValidator = new FormValidator(
  constants.validationSettings,
  constants.profileEditForm
);
const addCardFormValidator = new FormValidator(constants.validationSettings, constants.newCardAddForm);

editProfileFormValidator.enableValidation();
addCardFormValidator.enableValidation();

/*function openModal(modal) {
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

function submitProfile(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}

function submitNewCard(e) {
  e.preventDefault();
  createNewCard()
  e.target.reset();
  closeModal(newCardModal);
  addFormValidator.disableBtn();
}


const handlePreviewImage = (data) => {
  const expandedImg = expandImgModal.querySelector(".modal__img-expand");
  const expandedImgText = expandImgModal.querySelector(".modal__name-title");
  expandedImg.src = data.link;
  expandedImg.alt = data.name;
  expandedImgText.textContent = data.name;
  openModal(expandImgModal);
};

function createNewCard() {
  const name = imageTitle.value;
  const link = imageUrl.value;
  const data = { name, link };

  cardList.prepend(createCard(data));
}


closeButtons.forEach((button) => {
  const popup = button.closest('.modal');
  button.addEventListener('click', () => closeModal(popup));
});
profileEditForm.addEventListener("submit", submitProfile);


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
});*/
