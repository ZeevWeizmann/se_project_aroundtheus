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
const modalClose = document.querySelector(".modal__close");
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
/* Functions */

function closePopup() {
  profileEditModal.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  console.log(initialCards);
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__description");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  return cardElement;
}

/* Event handlers */
function handleProfileSubmit(e) {
  e.preventDefault();
  profileInfoName.textContent = profileInfoNameInput.value;
  profileInfoProfession.textContent = profileInfoProfessionInput.value;
  closePopup();
}

/* Event listeners */

profileButtonEdit.addEventListener("click", () => {
  profileInfoNameInput.value = profileInfoName.textContent;
  profileInfoProfessionInput.value = profileInfoProfession.textContent;
  profileEditModal.classList.add("modal_opened");
});

modalClose.addEventListener("click", closePopup);
profileEditForm.addEventListener("submit", handleProfileSubmit);

/* for (let i = 0; i < initialCards.length; i++) {
  console.log(initialCards[i]);
}
 */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
