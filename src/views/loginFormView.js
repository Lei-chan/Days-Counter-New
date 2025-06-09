import View from "./View";

class LoginFormView extends View {
  _parentElement = document.querySelector(".login--form");
  _messageContainer = document.querySelector(".login--error");
  _errorMessageNoInput = "The field is empty! Please fill both fields!";
  _errorMessageWrong = "This account doesn't exist! Please try again!";

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const inputUsername = this._parentElement.querySelector(
        ".login--input_username"
      ).value;
      const inputPassword = this._parentElement.querySelector(
        ".login--input_password"
      ).value;

      if (!inputUsername || !inputPassword)
        return this.renderError(this._errorMessageNoInput);

      handler(inputUsername, inputPassword);
    });
  }

  renderError(errorMessage = this._errorMessage) {
    this._messageContainer.innerHTML = errorMessage;
    this.open(this._messageContainer);
  }
}

export default new LoginFormView();
