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

/* Elements */
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditClose = profileEditModal.querySelector(".modal__close");

const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoProfession = document.querySelector(
  ".profile__info-profession"
);
const profileInfoNameInput = document.querySelector("#info-name-input");
const profileInfoProfessionInput = document.querySelector(
  "#info-profession-input"
);
const profileEditForm = profileEditModal.querySelector('[name="profile-form"]');
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__button-add");
const profileAddModal = document.querySelector("#profile-add-modal");
const profileAddClose = profileAddModal.querySelector(".modal__close");
const cardTitleInput = profileAddModal.querySelector("#modal-input-type-title");
const cardUrlInput = profileAddModal.querySelector("#modal-input-type-url");
const addCardForm = profileAddModal.querySelector('[name="add-card-form"]');
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__heading_preview"
);
const previewImageClose = previewImageModal.querySelector(".modal__close");
/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  console.log(initialCards);
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description");
  const likeButton = cardElement.querySelector(".card__button-like");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__button-like_active");
  });
  const deleteButton = cardElement.querySelector(".card__button-delete");
  // deleteButton.addEventListener("click", () => {
  //   console.log(deleteButton);
  // });
  deleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", (event) => {
    event.preventDefault();
    previewImageModal.classList.add("modal_opened");
    previewImage.src = cardData.link;
    previewImageTitle.textContent = cardData.name;
  });
  return cardElement;
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

/* Event handlers */
function handleProfileSubmit(e) {
  e.preventDefault();
  profileInfoName.textContent = profileInfoNameInput.value;
  profileInfoProfession.textContent = profileInfoProfessionInput.value;

  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const newCardData = {
    name: cardTitleInput.value,
    link: cardUrlInput.value,
  };
  const cardElement = getCardElement(newCardData);
  cardListEl.prepend(cardElement);
  closePopup(profileAddModal);
  addCardForm.reset();
}

/* Event listeners */

profileButtonEdit.addEventListener("click", () => {
  profileInfoNameInput.value = profileInfoName.textContent;
  profileInfoProfessionInput.value = profileInfoProfession.textContent;
  // profileEditModal.classList.add("modal_opened");
  openModal(profileEditModal);
});

profileEditClose.addEventListener("click", () => {
  closePopup(profileEditModal);
});
profileEditForm.addEventListener("submit", handleProfileSubmit);

/* for (let i = 0; i < initialCards.length; i++) {
  console.log(initialCards[i]);
}
 */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

//add new card
addNewCardButton.addEventListener("click", () =>
  profileAddModal.classList.add("modal_opened")
);

profileAddClose.addEventListener("click", () => {
  closePopup(profileAddModal);
});

// const likeButtons = document.querySelectorAll(".card__button-like");
// likeButtons.forEach((button) => {
//   button.addEventListener("click", () => {
//     button.classList.toggle("card__button-like_active");
//   });
// });

profileAddModal.addEventListener("submit", handleAddCardSubmit);

previewImageClose.addEventListener("click", () =>
  closePopup(previewImageModal)
);
