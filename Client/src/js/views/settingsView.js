import View from "./View";
import {
  USERNAME_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_UPPERCASE,
  PASSWORD_MIN_LOWERCASE,
  PASSWORD_MIN_DIGIT,
  PASSWORD_MIN_SPECIAL_CHARACTER,
} from "../config.js";

class SettingsView extends View {
  _parentElement = document.querySelector(".page--settings");
  _renderInitContainer = document.querySelector(".settings_form");
  _messageContainer;
  _message;
  _errorMessage = "Please fill the field below";
  _errorMessagePasswordRequirements = `Password needs to include more than ${PASSWORD_MIN_LENGTH} characters, at least ${PASSWORD_MIN_UPPERCASE} uppercase, ${PASSWORD_MIN_LOWERCASE} lowercase, ${PASSWORD_MIN_DIGIT} digit, and ${PASSWORD_MIN_SPECIAL_CHARACTER} special character`;
  _data;

  addHandlerClickX(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".settings--btn_x");
      if (!btn) return;

      handler();
    });
  }

  addEventClickChange() {
    this._parentElement.addEventListener("click", (e) => {
      if (e.target.closest(".btn--change_username"))
        this._renderInputField("username");

      if (e.target.closest(".btn--change_email"))
        this._renderInputField("email");

      if (e.target.closest(".btn--change_password"))
        this._renderInputField("password");

      this.addEventRemoveErrorInputField();
    });
  }

  addHandlerClickFinish(handlerUpdatePassword, handlerUpdateUsernameEmail) {
    this._parentElement.addEventListener("click", (e) => {
      const clicked = e.target;

      if (!clicked.closest(".btn--finish")) return;

      if (clicked.closest(".btn--finish_password")) {
        this._message = "Password updated successfully";

        const curPasswordField = this._parentElement.querySelector(
          "#input--cur_password"
        );
        const newPasswordField = this._parentElement.querySelector(
          "#input--new_password"
        );

        const curPasswordInput = curPasswordField.value.trim();
        const newPasswordInput = newPasswordField.value.trim();

        if (!curPasswordInput) this.renderErrorInputField(curPasswordField);

        if (!newPasswordInput || !this._validatePassword(newPasswordInput))
          this.renderErrorInputField(newPasswordField);

        if (!curPasswordInput || !newPasswordInput) return this.renderError();
        if (!this._validatePassword(newPasswordInput))
          return this.renderError(this._errorMessagePasswordRequirements);

        return handlerUpdatePassword(
          curPasswordInput,
          newPasswordInput,
          curPasswordField,
          newPasswordField
        );
      }

      let section;
      let inputField;
      let input;

      if (clicked.closest(".btn--finish_username")) {
        this._message = "Username updated successfully";

        section = "username";
        inputField = this._parentElement.querySelector("#input--username");
        input = inputField.value.trim();
      }

      if (clicked.closest(".btn--finish_email")) {
        this._message = "Email updated successfully";

        section = "email";
        inputField = this._parentElement.querySelector("#input--email");
        input = inputField.value.trim();
      }

      if (!input) {
        this.renderError();
        return this.renderErrorInputField(inputField);
      }

      handlerUpdateUsernameEmail(input, section, inputField);
    });
  }

  //username, email, or password
  _renderInputField(section) {
    this._messageContainer = this._parentElement.querySelector(
      ".settings--error_message"
    );

    let container;

    if (section === "password") {
      container = this._parentElement.querySelector(".settings--password");

      const passwordExplanation =
        window.innerWidth > 480
          ? `
        ${PASSWORD_MIN_LENGTH} letters at minimum:  Include more than ${PASSWORD_MIN_UPPERCASE} uppercase, <br>${PASSWORD_MIN_LOWERCASE} lowercase, ${PASSWORD_MIN_DIGIT} digit, and ${PASSWORD_MIN_SPECIAL_CHARACTER} special character!`
          : `
        ${PASSWORD_MIN_LENGTH} letters at minimum:<br> Include more than ${PASSWORD_MIN_UPPERCASE} uppercase, ${PASSWORD_MIN_LOWERCASE} lowercase,<br>${PASSWORD_MIN_DIGIT} digit, and ${PASSWORD_MIN_SPECIAL_CHARACTER} special character!`;

      return (container.innerHTML = `
        <p class="password_explanation--tiny settings--explanation_tiny">${passwordExplanation}</p>
        <div>
          <p>Please enter your current password</p>
          <div class="input_password--outer">
            <input class="input--password" id="input--cur_password" type="password" placeholder="your current password" minLength="${PASSWORD_MIN_LENGTH}">
            <button class="btn--password_visibility btn_password_visibility--settings_cur_password" type="button"></button>
          </div>
          <p>Please enter your new password</p>
          <div class="input_password--outer">
            <input class="input--password" id="input--new_password" type="password" placeholder="your new password" minLength="${PASSWORD_MIN_LENGTH}">
            <button class="btn--password_visibility btn_password_visibility--settings_new_password" type="button"></button>
          </div>
        </div>
        <button class="btn--finish btn--finish_password">Finish</button>`);
    }

    if (section === "username")
      container = this._parentElement.querySelector(".settings--username");

    if (section === "email")
      container = this._parentElement.querySelector(".settings--email");

    container.innerHTML = `
    ${
      section === "username"
        ? `<p class="username_explanation--tiny settings--explanation_tiny">
    Use ${USERNAME_MAX_LENGTH} letters at maximum</p>`
        : ""
    }
    <div>
    <input id="input--${section}" ${
      section === "username"
        ? `type="text" maxLength="${USERNAME_MAX_LENGTH}"`
        : 'type="email"'
    } placeholder="your new ${section}">
    </div>
    <button class="btn--finish btn--finish_${section}">Finish</button>`;

    if (section === "username")
      this._parentElement.querySelector(`#input--${section}`).value =
        this._data.username;

    if (section === "email")
      this._parentElement.querySelector(`#input--${section}`).value =
        this._data.email || "";
  }

  _generateMarkup() {
    return `
        <p class="error_message settings--error_message hidden">??</p>
        <button class="btn--x settings--btn_x">&times;</button>
        <h1>Account information</h1>
        <h3>
          Username
        </h3>
        <div class="settings--username">
          <p>${this._data.username}</p>
          <button class="btn--change_username">Change</button>        
        </div>
        <h3>
          Email address
        </h3>
        <div class="settings--email">
          <div class="settings_email_p--outer">
            <p>${this._data.email || "No email is set"}</p>
          </div>
          <button class="btn--change_email">Change</button>        
        </div>
        <h3>Password</h3>
        <div class="settings--password">
          <button class="btn--change_password">change</button>
        </div>
    `;
  }
}

export default new SettingsView();
