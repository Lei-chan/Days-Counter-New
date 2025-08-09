// import { mark } from "regenerator-runtime";
import { MESSAGE_TIMEOUT, LOGOUNT_TIMEOUT } from "../config.js";

export default class View {
  open(element = this._parentElement) {
    element.classList.remove("hidden");
  }

  close(element = this._parentElement) {
    element.classList.add("hidden");
  }

  openSlow(element = this._parentElement) {
    element.style.opacity = 1;
  }

  closeSlow(element = this._parentElement) {
    element.style.opacity = 0;
  }

  _clearInputField(field) {
    field.value = "";
  }

  _clearHTML(element) {
    element.innerHTML = "";
  }

  renderToParentEle(data) {
    if (data) this._data = data;
    const markup = this._generateMarkup();
    this._clearHTML(this._parentElement);
    this._parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  renderPartialToParentEle(position, data) {
    if (data) this._data = data;
    const markup = this._generateMarkup();
    this._parentElement.insertAdjacentHTML(position, markup);
  }

  renderInit(data) {
    if (data) this._data = data;
    const markup = this._generateMarkup();
    this._clearHTML(this._renderInitContainer);
    this._renderInitContainer.insertAdjacentHTML("afterbegin", markup);
  }

  render(container, markup) {
    this._clearHTML(container);
    container.insertAdjacentHTML("afterbegin", markup);
  }

  renderError(message = this._errorMessage) {
    this._messageContainer.innerHTML = message;
    this._messageContainer.style.backgroundColor = "#fa7304";
    this.open(this._messageContainer);
  }

  renderMessage(message = this._message) {
    this._messageContainer.innerHTML = message;
    this._messageContainer.style.backgroundColor = "#a4b600";
    this.open(this._messageContainer);
  }

  renderErrorInputField(inputField) {
    inputField.style.borderColor = "red";
  }

  addEventRemoveErrorInputField() {
    this._parentElement.addEventListener("click", (e) => {
      const inputField = e.target.closest("input");
      if (!inputField) return;

      inputField.style.borderColor = "#bbbbbb";
    });
  }

  _setTimeout(seconds = MESSAGE_TIMEOUT) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }

  _addEventClickEscapeClose(keyEventRemoveFocus, handler) {
    document.addEventListener("keydown", (e) => {
      if (this._parentElement.classList.contains("hidden")) return;

      ///Remove focused btns behind the overlay
      keyEventRemoveFocus();

      if (e.key !== "Escape") return;
      this.close();

      if (!handler) return;

      handler();
    });
  }

  _validatePassword(passwordInput) {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d\s]).{8,}$/;

    return passwordRegex.test(passwordInput.trim());
  }
}
