class EntireAppView {
  _parentElement = document.querySelector("body");

  constructor() {
    this._addEventClickPasswordVisibility();
  }

  _addEventClickPasswordVisibility() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--password_visibility");
      if (!btn) return;

      let closestInput;
      let btns;
      if (
        btn.classList.contains("btn_password_visibility--settings_cur_password")
      ) {
        closestInput = btn.closest("div").querySelector("#input--cur_password");
        btns = btn.closest("div").querySelectorAll(".btn--password_visibility");
      } else if (
        btn.classList.contains("btn_password_visibility--settings_new_password")
      ) {
        closestInput = btn.closest("div").querySelector("#input--new_password");
        btns = btn.closest("div").querySelectorAll(".btn--password_visibility");
      } else if (
        btn.classList.contains(
          "btn_password_visibility--settings_password_close_account"
        )
      ) {
        closestInput = btn
          .closest("div")
          .querySelector("#input--password_close_account");
        btns = btn.closest("div").querySelectorAll(".btn--password_visibility");
      } else {
        closestInput = btn.closest("form").querySelector(".input--password");
        btns = btn
          .closest("form")
          .querySelectorAll(".btn--password_visibility");
      }

      btns.forEach((btn) => btn.classList.toggle("hidden"));

      closestInput.type = btn.classList.contains(
        "btn_password_visibility--eye_off"
      )
        ? "password"
        : "text";
    });
  }
}

export default new EntireAppView();
