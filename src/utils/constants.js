//VALIDATION

export const validationSettings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}; 

//PROFILE INFORMATION

export const profileTitle = document.querySelector(".js-profile-title"); 
export const profileDescription = document.querySelector(
  ".js-profile-description"
);

//PROFILE EDIT INFORMATION

export const titleInput = document.querySelector(".js-profile-modal-title"); 
export const descriptionInput = document.querySelector(
  ".js-profile-modal-description"
); 

//AVATAR EDIT MODAL

export const avatarImg = document.querySelector(".js-profile-img")
export const avatarEditModal = ".js-profile-picture-modal"; 
export const editAvatarBtn = document.querySelector(".profile__edit-avatar"); 
export const avatarEditForm = document.forms.newprofilepicform;

//PROFILE EDIT MODAL

export const profileEditBtn = document.querySelector(".js-profile-edit-button"); 
export const profileEditModal = ".js-profile-edit-modal"; 
export const profileEditForm = document.forms.profileform; 

//ADD CARD MODAL

export const addNewCardBtn = document.querySelector(".profile__add-button"); 
export const newCardSelector = ".js-new-card-modal"; 
export const newCardAddForm = document.forms.newcardform; 
export const imageTitle = document.querySelector("#title-image");
export const imageUrl = document.querySelector("#image-url");

//DELETE CARD MODAL

export const deleteCardModal = ".js-delete-card-modal"; 

//CARD TEMPLATE

export const cardList = document.querySelector(".js-card-list");
export const cardSelector = "#card-template";

//ALL CLOSE BTNS

export const closeButtons = document.querySelectorAll(".modal__close");

//EXPAND IMG MODAL

export const expandImgModal = ".js-expand-img-modal";

//IS FETCHING

export let isFetching = false;
