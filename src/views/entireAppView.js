class EntireAppView {
  _parentElement = document.querySelector("body");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn_howtouse");
      if (!btn) return;

      handler();
    });
  }
}

export default new EntireAppView();
