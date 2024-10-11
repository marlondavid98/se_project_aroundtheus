//CARD INFORMATION

/*export const initialCards = [
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
];*/

//VALIDATION

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}; //!!

//PROFILE INFORMATION

export const profileTitle = document.querySelector(".js-profile-title"); //!!
export const profileDescription = document.querySelector(
  ".js-profile-description"
);//!!

//PROFILE EDIT INFORMATION

export const titleInput = document.querySelector(".js-profile-modal-title"); //!!
export const descriptionInput = document.querySelector(
  ".js-profile-modal-description"
); //!!

//AVATAR EDIT MODAL

export const avatarEditModal = ".js-profile-picture-modal"; //!!
export const editAvatarBtn = document.querySelector(".profile__avatar-container"); //!!
export const avatarEditForm = document.forms.newprofilepicform;

//PROFILE EDIT MODAL

export const profileEditBtn = document.querySelector(".js-profile-edit-button"); //!!
export const profileEditModal = ".js-profile-edit-modal"; //!!
export const profileEditForm = document.forms.profileform; //!!

//ADD CARD MODAL

export const addNewCardBtn = document.querySelector(".profile__add-button"); //!!
export const newCardSelector = ".js-new-card-modal"; //!!
export const newCardAddForm = document.forms.newcardform; //!!
export const imageTitle = document.querySelector("#title-image");
export const imageUrl = document.querySelector("#image-url");

//DELETE CARD MODAL

export const deleteCardModal = ".js-delete-card-modal"; //!!

//CARD TEMPLATE

export const cardList = document.querySelector(".js-card-list");
export const cardSelector = "#card-template"; //!!!

//ALL CLOSE BTNS

export const closeButtons = document.querySelectorAll(".modal__close");

//EXPAND IMG MODAL

export const expandImgModal = ".js-expand-img-modal"; //!
