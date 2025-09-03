export default class Card {
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }
  _setEventListeners() {
    this._cardElement
      .querySelector(".card__button-like")
      .addEventListener("click", (event) => {
        this._handleLikeIcon();
      });
    this._cardElement
      .querySelector(".card__button-delete")
      .addEventListener("click", (event) => {
        this._handleDeleteIcon();
      });
    this._cardElement
      .querySelector(".card__image")
      .addEventListener("click", (event) => {
        this._handleImageClick({ name: this._name, link: this._link });
      });
  }
  _handleDeleteIcon() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__button-like")
      .classList.toggle("card__button-like_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const img = this._cardElement.querySelector(".card__image");
    const title = this._cardElement.querySelector(".card__description");

    img.src = this._link;
    img.alt = this._name;
    title.textContent = this._name;
    this._setEventListeners();
    return this._cardElement;
  }
}
