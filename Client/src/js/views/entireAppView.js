class EntireAppView {
  _parentElement = document.querySelector("body");

  _addEventClickPasswordVisibility() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--password_visibility");
      if (!btn) return;

      let closestInput;
      if (
        btn.classList.contains("btn_password_visibility--settings_cur_password")
      ) {
        closestInput = btn.closest("div").querySelector("#input--cur_password");
      } else if (
        btn.classList.contains("btn_password_visibility--settings_new_password")
      ) {
        closestInput = btn.closest("div").querySelector("#input--new_password");
      } else {
        closestInput = btn.closest("form").querySelector(".input--password");
      }

      btn.classList.toggle("password--visible");

      closestInput.type = btn.classList.contains("password--visible")
        ? "text"
        : "password";
    });
  }
}

export default new EntireAppView();
