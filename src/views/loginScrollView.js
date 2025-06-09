class LoginScrollView {
  _parentElement = document.querySelector(".btn_scroll");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const id = e.target.getAttribute("href");
      handler();
      this._scroll(id);
    });
  }

  _scroll(id) {
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
}

export default new LoginScrollView();
