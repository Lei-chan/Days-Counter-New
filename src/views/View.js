import { mark } from "regenerator-runtime";

export default class View {
  open(element = this._parentElement) {
    element.classList.remove("hidden");
  }

  close(element = this._parentElement) {
    element.classList.add("hidden");
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

  renderInit() {
    const markup = this._generateMarkup();
    this._clearHTML(this._renderInitContainer);
    this._renderInitContainer.insertAdjacentHTML("afterbegin", markup);
  }
}
