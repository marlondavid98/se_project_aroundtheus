//IMPORTS

import Api from "../components/Api.js";
import * as constants from "../utils/constants.js";
import PopupWithDelete from "../components/PopupWithDelete.js";
import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import "./index.css";

//API IMPORT
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "3ffb0658-0b91-4d38-b182-fdf6c6b45774",
    "Content-Type": "application/json",
  },
});

//GET USER INFO

api.getUserInfo().then((data) => {
  userInformation.setUserInfo({ newName: data.name, newJob: data.about });
});

//GET INITIAL CARDS

api.getInitialCards().then((data) => {
  cardGeneration.renderItems(data);
});

//SECTION.JS

const cardGeneration = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(item);
      cardGeneration.addItem(cardElement);
    },
  },
  constants.cardList
);
api
  .getAllinfo()
  .then(([userData, cardData]) => {
    userInformation.setUserInfo({
      name: userData.name,
      job: userInformation.about,
    });
    cardGeneration.renderItems(cardData);
  })
  .catch((err) => {
    console.error(err);
  });

//CARD.JS

function createCard(data) {
  const cardElement = new Card(
    data,
    constants.cardSelector,
    handlePreviewImage,
    handleDeleteCard,
    handleLikeClick
  );
  return cardElement.getView();
}

//USER INFO

const userInformation = new UserInfo(
  constants.profileTitle,
  constants.profileDescription
);

//FORMVALIDATOR.JS

const editProfileFormValidator = new FormValidator(
  constants.validationSettings,
  constants.profileEditForm
);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(
  constants.validationSettings,
  constants.newCardAddForm
);
addCardFormValidator.enableValidation();

//ADD CARD POPUPWITHFORM.JS

const newCardPopup = new PopupWithForm(
  constants.newCardSelector,
  handleAddCardFormSubmit
);
newCardPopup.setEventListeners();

//EDIT PROFILE POPUPWITHFORM.JS

const editProfile = new PopupWithForm(
  constants.profileEditModal,
  handleProfileEditSubmit
);
editProfile.setEventListeners();

//EDIT AVATAR POPUPWITHFORM.JS

const editAvatar = new PopupWithForm(
  constants.avatarEditModal,
  handleAvatarEditSubmit
)
editAvatar.setEventListeners();

//DELETE CARD FORMVALIDATOR.JS

const deleteCardSelector = new PopupWithForm(
  constants.deleteCardModal,
  api.deleteCard
)
deleteCardSelector.setEventListeners();

//POPUPWITHIMAGE.JS

const imagePopup = new PopupWithImage(constants.expandImgModal);
imagePopup.setEventListeners();

//FUNCTIONS

function handlePreviewImage(data) {
  imagePopup.open(data);
}

function handleDeleteCard(cardId) {
  if (!cardId) {
    console.error("Card ID is undefined or missing. Unable to delete card.");
    return;
  }
  api
    .deleteCard(cardId)
    .then(() => {
      cardId.deleteCard();
    })
    .catch((err) => {
      console.error(err);
    });
}

function handleLikeClick(card, cardId, isLiked) {
  if (isLiked) {
    api
      .dislikeCard(cardId)
      .then((newData) => {
        card.updateLikes(newData.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then((newData) => {
        card.updateLikes(newData.likes);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleAddCardFormSubmit(formInputs) {
  //preventDefault();
  
  api
    .createNewCard(formInputs)
    .then((newCard) => {
      cardGeneration.addItem(createCard(newCard));
      newCardPopup.close();
      addCardFormValidator.disableBtn();
    })
    //.catch((err) => console.error(err));
}

function handleProfileEditSubmit(formInputs) {
  //preventDefault();
  api
    .updateProfileInfo(formInputs.newName, formInputs.newJob)
    .then((newUserData)=>{
      userInformation.setUserInfo({
        newName: newUserData.name,
        newJob: newUserData.about,
      })
      editProfile.close();
    })
    .catch((err) => console.error(err));
}

function handleAvatarEditSubmit(formInputs) {
 // e.preventDefault
  const {link} = formInputs;
  api 
    .updateAvatar(link)
    .catch((err) => console.error(err));
}

//EVENT LISTENERS 
//OPEN PROFILE EDIT MODAL

constants.profileEditBtn.addEventListener("click", () => {
  const { name, job } = userInformation.getUserInfo();
  constants.titleInput.value = name;
  constants.descriptionInput.value = job;
  editProfile.open();
  editProfileFormValidator.toggleButtonState();
});

//OPEN ADD CARD MODAL

constants.addNewCardBtn.addEventListener("click", () => {
  newCardPopup.open();
});

//OPEN EDIT AVATAR MODAL

constants.editAvatarBtn.addEventListener("click", () => {
  editAvatar.open();
});
