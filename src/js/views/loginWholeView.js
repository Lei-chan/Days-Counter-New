import View from "./View";

class LoginWholeView extends View {
  _parentElement = document.querySelector(".page--login");

  _addHandlerClickAppExplanation(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--app_explanation");
      if (!btn) return;

      handler();
    });
  }
}

export default new LoginWholeView();
