import View from "./View";

class LoginFormView extends View {
  _parentElement = document.querySelector(".login--form");
  _messageContainer = document.querySelector(".login--error");
  _errorMessageNoInput = "The field is empty! Please fill both fields!";
  _errorMessageWrong = "This account doesn't exist! Please try again!";

  _resetLogingForm() {
    this._clearInputField(document.getElementById("login--input_username"));
    this._clearInputField(document.getElementById("login--input_password"));

    this._messageContainer.classList.add("hidden");
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const usernameField = document.getElementById("login--input_username");
      const passwordField = document.getElementById("login--input_password");

      const usernameInput = usernameField.value.trim();
      const passwordInput = passwordField.value.trim();

      if (!usernameInput) this.renderErrorInputField(usernameField);

      if (!passwordInput) this.renderErrorInputField(passwordField);

      if (!usernameInput || !passwordInput) {
        this.addEventRemoveErrorInputField();
        return this.renderError(this._errorMessageNoInput);
      }

      handler(usernameInput, passwordInput);
    });
  }

  addHandlerClickForgotPassword(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const link = e.target.closest(".link--forgot_password");
      if (!link) return;

      handler();
    });
  }
}

export default new LoginFormView();
