//IMPORTS
let isFetching = false;
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

const baseUrl = "https://around-api.en.tripleten-services.com/v1"
const headers = {
  authorization: "3ffb0658-0b91-4d38-b182-fdf6c6b45774",
  "Content-Type": "application/json",
}
const api = new Api({
  baseUrl: baseUrl,
  headers: headers,
});

//GET USER INFO
api
.getUserInfo()
  .then((data) => {
    userInformation.setUserInfo({ newName: data.name, newJob: data.about })
    userInformation.setAvatarInfo({avatar: data.avatar});
})
.catch((err) => {
  console.error(err);
});

//GET INITIAL CARDS
api
.getInitialCards()
.then((data) => {
  cardGeneration.renderItems(data);
})
.catch((err) => {
  console.error(err);
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
  constants.profileDescription,
  constants.avatarImg,
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

const editAvatarFormValidator = new FormValidator(
  constants.validationSettings,
  constants.avatarEditForm
);
editAvatarFormValidator.enableValidation();

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
);
editAvatar.setEventListeners();

//DELETE CARD POPUPWITHDELETE.JS

const deleteCardSelector = new PopupWithDelete(
  constants.deleteCardModal,
  handleConfirmDelete
);
deleteCardSelector.setEventListeners();
//POPUPWITHIMAGE.JS

const imagePopup = new PopupWithImage(constants.expandImgModal);
imagePopup.setEventListeners();

//FUNCTIONS

function handlePreviewImage(data) {
  imagePopup.open(data);
}

function handleDeleteCard(card, cardId) {
  deleteCardSelector.setSubmitFunction(()=>{
    handleConfirmDelete(card, cardId)
  })
  deleteCardSelector.open();
}

function handleConfirmDelete(card, cardId) { 
  if (isFetching) return; 
  isFetching = true;
  deleteCardSelector.setButtonText(isFetching);
  if (!cardId) {
    console.error("Card ID is undefined or missing. Unable to delete card.");
    return;
  }
  api
    .deleteCard(cardId)
    .then(() => {
      console.log(`Successfully deleted card with ID: ${cardId}`);
      card.deleteCard();
      deleteCardSelector.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      isFetching = false;
      deleteCardSelector.setButtonText(isFetching);
    });
}

function handleLikeClick(card, cardId, isLiked) {
  if (isLiked) {
    api
      .dislikeCard(cardId)
      .then(() => {
        card.updateLikes();
      })
      .catch((err) => {
        console.error(err);
      });
  } else {
    api
      .likeCard(cardId)
      .then(() => {
        card.updateLikes();
      })
      .catch((err) => {
        console.error(err);
      });
  }
}

function handleAddCardFormSubmit(formInputs) {
  if (isFetching) return; 
  isFetching = true;
  newCardPopup.setButtonText(isFetching);
  api
    .createNewCard(formInputs)
    .then((newCard) => {
      cardGeneration.addItem(createCard(newCard));
      addCardFormValidator.disableBtn();
      newCardPopup.close();
      constants.newCardAddForm.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      isFetching = false;
      newCardPopup.setButtonText(isFetching);
    })
}

function handleProfileEditSubmit(formInputs) {
  if (isFetching) return; 
  isFetching = true;
  editProfile.setButtonText(isFetching);

  api
    .updateProfileInfo(formInputs.newName, formInputs.newJob)
    .then((newUserData) => {
      userInformation.setUserInfo({
        newName: newUserData.name,
        newJob: newUserData.about,
      });
      editProfile.close();
      constants.profileEditForm.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      isFetching = false;
      editProfile.setButtonText(isFetching);
    });
}

function handleAvatarEditSubmit({ link }) {
  if (isFetching) return; 
  isFetching = true;
  editAvatar.setButtonText(isFetching);
  api
    .updateAvatar(link)
    .then(({ avatar }) => {
      userInformation.setAvatarInfo({ avatar });
      editAvatar.close();
      constants.avatarEditForm.reset();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      isFetching = false;
      editAvatar.setButtonText(isFetching);
    });
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
  addCardFormValidator.toggleButtonState();
});

//OPEN EDIT AVATAR MODAL

constants.editAvatarBtn.addEventListener("click", () => {
  editAvatar.open();
  editAvatarFormValidator.toggleButtonState();
});
