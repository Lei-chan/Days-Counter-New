import View from "./View";

class LoginForgotPasswordView extends View {
  _parentElement = document.querySelector(".page--forgot_password");
  _btnX = document.querySelector(".forgot_password--btn_x");
  _form = document.querySelector(".forgot_password--form");
  _messageContainer = document.querySelector(".forgot_password--warning");
  _successMessage = document.querySelector(".success_message");
  _errorMessage = "Email address is required";

  addHandlerClickClose(handler) {
    this._btnX.addEventListener("click", (e) => {
      const btn = e.target.closest(".forgot_password--btn_x");
      if (!btn) return;

      this.close(this._messageContainer);
      this.removeErrorInputField();

      handler();
    });
  }

  addHandlerSubmit(handler) {
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();

      // const btn = e.target.closest(".btn--send");
      // if (!btn) return;

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
