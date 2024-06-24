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
const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoProfession = document.querySelector(
  ".profile__info-profession"
);
const profileInfoNameInput = document.querySelector("#info-name-input");
const profileInfoProfessionInput = document.querySelector(
  "#info-profession-input"
);
const profileEditForm = document.forms["profile-form"];
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__button-add");
const profileAddModal = document.querySelector("#profile-add-modal");
const cardTitleInput = profileAddModal.querySelector("#modal-input-type-title");
const cardUrlInput = profileAddModal.querySelector("#modal-input-type-url");
const addCardForm = profileAddModal.querySelector('[name="add-card-form"]');
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__heading_preview"
);

const closeButtons = document.querySelectorAll(".modal__close");

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
    openModal(previewImageModal);
    previewImage.src = cardData.link;
    previewImage.alt = cardData.name;
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

  renderCard(newCardData, "prepend");
  closePopup(profileAddModal);
  addCardForm.reset();
}

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  cardListEl[method](cardElement);
}

/* Event listeners */

profileButtonEdit.addEventListener("click", () => {
  profileInfoNameInput.value = profileInfoName.textContent;
  profileInfoProfessionInput.value = profileInfoProfession.textContent;

  openModal(profileEditModal);
});

profileEditForm.addEventListener("submit", handleProfileSubmit);

initialCards.forEach((cardData) => {
  renderCard(cardData, "append");
});

//add new card
addNewCardButton.addEventListener("click", () => {
  openModal(profileAddModal);
});

profileAddModal.addEventListener("submit", handleAddCardSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");

  button.addEventListener("click", () => closePopup(popup));
});
