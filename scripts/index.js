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
const closeExpandImg = document.querySelector(".js-close-expand-image");

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

function submitProfile(e) {
  e.preventDefault();
  profileTitle.textContent = titleInput.value;
  profileDescription.textContent = descriptionInput.value;
  closeModal(profileEditModal);
}
function submitNewCard(e) {
  e.preventDefault();
  const name = imageTitle.value;
  const link = imageUrl.value;
  const cardElement = getCardElement({
    name,
    link,
  });
  e.target.reset();
  cardList.prepend(cardElement);
  closeModal(newCardModal);
}
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageSrc = cardElement.querySelector(".card__image");
  const cardText = cardElement.querySelector(".card__text");
  const likeBtn = cardElement.querySelector(".card__like-button");
  const deleteBtn = cardElement.querySelector(".card__trash-button");

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });
  deleteBtn.addEventListener("click", () => {
    cardElement.remove(data);
  });
  cardImageSrc.addEventListener("click", () => handlePreviewImage(data));

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

profileEditForm.addEventListener("submit", submitProfile);
addNewCardBtn.addEventListener("click", () => openModal(newCardModal));
closeNewCardBtn.addEventListener("click", () => closeModal(newCardModal));
newCardAddForm.addEventListener("submit", submitNewCard);
closeExpandImg.addEventListener("click", () => closeModal(expandImgModal));

initialCards.forEach((data) => {
  const cardElement = getCardElement(data);
  cardList.append(cardElement);
});

const handlePreviewImage = (data) => {
  const expandedImg = expandImgModal.querySelector(".modal__img-expand");
  const expandedImgText = expandImgModal.querySelector(".modal__name-title");
  expandedImg.src = data.link;
  expandedImg.alt = data.name;
  expandedImgText.textContent = data.name;
  openModal(expandImgModal);
};

const modalList = document.querySelectorAll(".modal");

modalList.forEach((modal) => {
  modal.addEventListener("mousedown", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});
