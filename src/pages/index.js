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
  editProfileFormValidator.toggleButtonState();
});

//ADD CARD POPUPWITHFORM.JS

const newCardPopup = new PopupWithForm(constants.newCardSelector, (data) => {
  cardGeneration.addItem(createCard(data));
  newCardPopup.close();
});

newCardPopup.setEventListeners();

//OPEN ADD CARD MODAL

constants.addNewCardBtn.addEventListener("click", () => {
  newCardPopup.open();
  addCardFormValidator.toggleButtonState();
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
