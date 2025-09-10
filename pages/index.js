import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

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
const cardListEl = document.querySelector(".cards");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const addNewCardButton = document.querySelector(".profile__button-add");
const profileAddModal = document.querySelector("#profile-add-modal");
const cardTitleInput = profileAddModal.querySelector("#modal-input-type-title");
const cardUrlInput = profileAddModal.querySelector("#modal-input-type-url");
const previewImageModal = document.querySelector("#preview-image-modal");
const previewImage = previewImageModal.querySelector(".modal__preview-image");
const previewImageTitle = previewImageModal.querySelector(
  ".modal__heading_preview"
);

const closeButtons = document.querySelectorAll(".modal__close");

/* Functions */

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closePopupByEsc);
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closePopupByEsc);
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
  formValidators["add-card-form"].resetValidation();
  formValidators["add-card-form"].disableSubmitButton();
}

function renderCard(item, method = "prepend") {
  const card = new Card(item, "#card-template", handleImageClick);
  const cardElement = card.getView();
  cardListEl[method](cardElement);
}

/* Form Validation */
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name"); // name должен быть в html у <form>
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};
enableValidation(config);
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = profileAddModal.querySelector(".modal__form");

/* Event listeners */

profileButtonEdit.addEventListener("click", () => {
  profileInfoNameInput.value = profileInfoName.textContent;
  profileInfoProfessionInput.value = profileInfoProfession.textContent;

  openModal(profileEditModal);
  formValidators["profile-form"].resetValidation();
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

document.querySelectorAll(".modal").forEach(function (modal) {
  const overlay = modal.querySelector(".modal__overlay");
  if (overlay) {
    overlay.addEventListener("click", function () {
      closePopup(modal);
    });
  }
});

function closePopupByEsc(e) {
  if (e.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");

    if (openModal) {
      closePopup(openModal);
    }
  }
}

function handleImageClick({ name, link }) {
  previewImage.src = link;
  previewImage.alt = name;
  previewImageTitle.textContent = name;
  openModal(previewImageModal);
}
