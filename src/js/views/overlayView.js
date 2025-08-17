import View from "./View";

class OverlayView extends View {
  _parentElement = document.querySelector(".overlay");

  addHandlerClickX(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--x");
      if (!btn) return;

      handler();
    });
  }

  addHandlerClickOutside(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (
        e.target.className !== "overlay" &&
        e.target.className !== "overlay_in--how_to_create" &&
        !e.target.closest("h1")
      )
        return;

      handler();
    });
  }
}

export default new OverlayView();
