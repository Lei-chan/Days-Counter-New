import View from "./View";

class LoginForgotPasswordView extends View {
  _parentElement = document.querySelector(".forgot_password--form");
  _messageContainer = document.querySelector(".forgot_password--warning");
  _errorMessage = "Email address is required";

  addHandlerClickClose(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();

      const btn = e.target.closest(".forgot_password--btn_x");
      if (!btn) return;

      this.close(this._messageContainer);

      handler();
    });
  }

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();

      const btn = e.target.closest(".btn--send");
      if (!btn) return;

      const emailField = document.getElementById(
        "forgot_password--input_email"
      );
      const emailInput = emailField.value.trim();

      if (!emailInput) {
        this.renderErrorInputField(emailField);
        this.addEventRemoveErrorInputField();
        return this.renderError();
      }

      handler(emailInput);
    });
  }
}

export default new LoginForgotPasswordView();
