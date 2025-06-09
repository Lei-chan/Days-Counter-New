import View from "./View";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_DIGIT,
  PASSWORD_MIN_SPECIAL_CHARACTER,
} from "../js/config";
///////Validate password a user sets//////
import { PasswordValidatorManager } from "@password-validator/core";

class LoginBottomHalfView extends View {
  _parentElement = document.querySelector(".bottom_half");
  _renderInitContainer = document.querySelector(".password_explanation--tiny");

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("submit", (e) => {
      e.preventDefault();
      const username = document.querySelector(".bottom_half--input_username");
      const password = document.querySelector(".bottom_half--input_password");

      if (!username.value || !password.value) return;

      const passwordValidation = this._validateAccInfo(password.value);

      if (passwordValidation.valid) handler(username.value, password.value);

      this._clearInputField(username);
      this._clearInputField(password);
    });
  }

  _validateAccInfo(inputValue) {
    const result = PasswordValidatorManager.fluent()
      .min(PASSWORD_MIN_LENGTH) // Minimum length
      .digit(PASSWORD_MIN_DIGIT) // Minimum amount of digits
      .specialCharacter(PASSWORD_MIN_SPECIAL_CHARACTER) // Minimum amount of special characters
      .validate(inputValue);

    return result;
  }

  _generateMarkup() {
    return `Use ${PASSWORD_MIN_LENGTH} letters at minimam including <br>more than ${PASSWORD_MIN_DIGIT} digit and ${PASSWORD_MIN_SPECIAL_CHARACTER} special character!`;
  }
}

export default new LoginBottomHalfView();
