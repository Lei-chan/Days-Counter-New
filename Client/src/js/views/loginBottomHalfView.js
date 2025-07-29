import View from "./View";
import {
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_UPPERCASE,
  PASSWORD_MIN_LOWERCASE,
  PASSWORD_MIN_DIGIT,
  PASSWORD_MIN_SPECIAL_CHARACTER,
} from "../config.js";
///////Validate password a user sets//////
import { PasswordValidatorManager } from "@password-validator/core";

class LoginBottomHalfView extends View {
  _parentElement = document.querySelector(".bottom_half");
  _renderInitContainer = document.querySelector(".bottom_half--inputs");
  _messageContainer = document.querySelector(".bottom_half--warning");
  _errorMessage = "Username and password are required!";

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const usernameField = document.getElementById(
        "bottom_half--input_username"
      );
      const passwordField = document.getElementById(
        "bottom_half--input_password"
      );
      const emailField = document.getElementById("bottom_half--input_email");
      const usernameInput = usernameField.value?.trim();
      const passwordInput = passwordField.value?.trim();
      const emailInput = emailField.value?.trim();

      if (!usernameInput) this.renderErrorInputField(usernameField);
      if (!passwordInput) this.renderErrorInputField(passwordField);

      this.addEventRemoveErrorInputField();

      if (!usernameInput || !passwordInput) return this.renderError();

      handler(usernameInput, passwordInput, emailInput);

      this._clearInputField(usernameField);
      this._clearInputField(passwordField);
      this._clearInputField(emailField);
    });
  }

  _generateMarkup() {
    return `
        <p class="bottom_half--warning hidden">????</p>
        <h2 class="bottom_half--username_explanation">username (required)</h2>
        <div>
        <span class="username_explanation--tiny">
        Use ${USERNAME_MAX_LENGTH} letters at maximum</span></div>
        <input id="bottom_half--input_username" type="text" placeholder="username" maxlength="${USERNAME_MAX_LENGTH}">

        <h2 class="bottom_half--password_explanation">password (required)</h2>
        <p class="password_explanation--tiny">
        ${PASSWORD_MIN_LENGTH} letters at minimum:  Include more than ${PASSWORD_MIN_UPPERCASE} uppercase, <br>${PASSWORD_MIN_LOWERCASE} lowercase, ${PASSWORD_MIN_DIGIT} digit, and ${PASSWORD_MIN_SPECIAL_CHARACTER} special character!</p>
        <input class="input--password" id="bottom_half--input_password" type="password" placeholder="password" minlength="${PASSWORD_MIN_LENGTH}"><button class="btn--password_visibility btn_password_visibility--login_bottom" type="button"></button>
        <h2 class="bottom_half--email_explanation">email address (optional)</h2>
        <span class="email_explanation--tiny">
        You can set email address in case you forget the password</span>
        <input id="bottom_half--input_email" type="email" placeholder="email address"></input>
        `;
  }
}

export default new LoginBottomHalfView();
