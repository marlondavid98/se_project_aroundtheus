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
const profileEditBtn = document.querySelector(".js-profile-edit-button");
const profileEditModal = document.querySelector(".js-profile-edit-modal");
const profileCloseEditModal = document.querySelector(".js-close-edit-profile");
const profileTitle = document.querySelector(".js-profile-title");
const profileDescription = document.querySelector(".js-profile-description");
const titleInput = document.querySelector(".js-profile-modal-title");
const descriptionInput = document.querySelector(
  ".js-profile-modal-description"
);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardList = document.querySelector(".js-card-list");

function openProfileModal() {
  titleInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal__opened");
}
function closeProfileModal() {
  profileEditModal.classList.remove("modal__opened");
}
function profileSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal();
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

profileEditBtn.addEventListener("click", openProfileModal);
profileCloseEditModal.addEventListener("click", closeProfileModal);
profileEditForm.addEventListener("submit", profileSubmit);

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});
