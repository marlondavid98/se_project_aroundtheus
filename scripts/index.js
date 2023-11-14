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
const profileCloseEditModal = document.querySelector(".js-close-edit-profile");
const addNewCardBtn = document.querySelector(".profile__add-button");
const closeNewCardBtn = document.querySelector(".js-close-new-card");

//DOM
const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");

//modals
const profileEditModal = document.querySelector(".js-profile-edit-modal");
const newCardModal = document.querySelector(".js-new-card-modal");

//forms
const profileEditForm = profileEditModal.querySelector(".modal__form");
const newCardAddForm = newCardModal.querySelector(".modal__form");

// forms inputs
const titleInput = document.querySelector(".js-profile-modal-title");
const descriptionInput = document.querySelector(
  ".js-profile-modal-description"
);
const imageTitle = document.querySelector("#titleimage");
const imageUrl = document.querySelector("#imageurl");

function openModal(modal) {
  modal.classList.add("modal_opened");
}
function closeModal(modal) {
  modal.classList.remove("modal_opened");
}

function profileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}
function newCardSubmit(e) {
  e.preventDefault();
  const name = imageTitle.value;
  const link = imageUrl.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  cardList.prepend(cardElement);
  closeModal(newCardModal);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageSrc = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");

  cardImageSrc.src = data.link;
  cardImageSrc.alt = data.name;
  cardText.textContent = data.name;
  return cardElement;
}

profileEditBtn.addEventListener("click", () => {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});
profileCloseEditModal.addEventListener("click", () =>
  closeModal(profileEditModal)
);
profileEditForm.addEventListener("submit", profileSubmit);
addNewCardBtn.addEventListener("click", () => openModal(newCardModal));
closeNewCardBtn.addEventListener("click", () => closeModal(newCardModal));
newCardAddForm.addEventListener("submit", newCardSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});
