import View from "./View.js";
import mainWholeView from "./mainWholeView.js";

class OverlayAppExplanationHowToUseView extends View {
  _parentElement = document.querySelector(
    ".overlay_app_explanation--how_to_use"
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
    const mainWholeViewParentEle = mainWholeView._parentElement;

    const btns = mainWholeViewParentEle.querySelectorAll("button");

    btns.forEach((btn) => btn.blur());
  }
}

export default new OverlayAppExplanationHowToUseView();
