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
const profileEditModel = document.querySelector("#profile-edit-model");
const modelClose = document.querySelector(".model__close");
const profileButtonEdit = document.querySelector(".profile__button-edit");
const profileInfoName = document.querySelector(".profile__info-name");
const profileInfoProfession = document.querySelector(
  ".profile__info-profession"
);
const profileInfoNameInput = document.querySelector("#info-name-input");
const profileInfoProfessionInput = document.querySelector(
  "#info-profession-input"
);
const profileEditForm = profileEditModel.querySelector(".model__form");
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
/* Functions */

function closePopop() {
  profileEditModel.classList.remove("model__opened");
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
  closePopop();
}

/* Event listeners */

profileButtonEdit.addEventListener("click", () => {
  profileInfoNameInput.value = profileInfoName.textContent;
  profileInfoProfessionInput.value = profileInfoProfession.textContent;
  profileEditModel.classList.add("model__opened");
});

modelClose.addEventListener("click", closePopop);
profileEditForm.addEventListener("submit", handleProfileSubmit);

/* for (let i = 0; i < initialCards.length; i++) {
  console.log(initialCards[i]);
}
 */
initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
