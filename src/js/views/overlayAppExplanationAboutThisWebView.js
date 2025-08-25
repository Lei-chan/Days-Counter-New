import View from "./View.js";
import loginWholeView from "./loginWholeView.js";

class OverlayAppExplanationAboutThisWebView extends View {
  _parentElement = document.querySelector(
    ".overlay_app_explanation--about_this_web"
  );

  constructor() {
    super();
    this._addEventClickX();
    this._addEventClickOutside();
    this._addEventClickEscapeClose(this._keyEventRemoveFocus);
  }

  _addEventClickX() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--x");
      if (!btn) return;

      this.close();
    });
  }

  _addEventClickOutside() {
    this._parentElement.addEventListener("click", (e) => {
      if (!e.target.classList.contains("overlay--app_explanation")) return;

      this.close();
    });
  }

  _keyEventRemoveFocus() {
    const loginWholeViewParentEle = loginWholeView._parentElement;

    const btns = loginWholeViewParentEle.querySelectorAll("button");

    btns.forEach((btn) => btn.blur());
  }
}

export default new OverlayAppExplanationAboutThisWebView();
