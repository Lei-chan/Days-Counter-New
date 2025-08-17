import View from "./View";

class LoginTopHalfView extends View {
  _parentElement = document.querySelector(".login");
  _renderInitContainer = this._parentElement.querySelector(".lists--news");
  _newsListsContainer = this._parentElement.querySelector(
    ".news_lists_container"
  );
  _messageContainer = this._parentElement.querySelector(".login--error");
  _errorMessageNoInput = "The field is empty! Please fill both fields!";
  _errorMessageWrong = "This account doesn't exist! Please try again!";
  _data; //manageData

  _addEvents() {
    this._addEventClickOutsideLists();
    this._addEventClickBtnNews();
    this._addEventClickList();
  }

  _addEventClickBtnNews() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--news");
      if (!btn) return;
      if (
        !this._newsListsContainer.style.opacity ||
        this._newsListsContainer.style.opacity === "0"
      ) {
        this.openSlow(this._newsListsContainer);
        this._newsListsContainer.style.zIndex = 3;
        return (this._newsListsContainer.style.cursor = "pointer");
      }

      if (this._newsListsContainer.style.opacity) {
        this.closeSlow(this._newsListsContainer);
        this._newsListsContainer.style.zIndex = 1;
        this._newsListsContainer.style.cursor = "default";
      }
    });
  }

  _addEventClickOutsideLists() {
    this._parentElement.addEventListener("click", (e) => {
      /////lists are invisible or clicked place was lists or btn--news => return
      if (
        !this._newsListsContainer.style.opacity ||
        this._newsListsContainer.style.opacity === "0" ||
        e.target.closest(".news_lists_container") ||
        e.target.closest(".btn--news")
      )
        return;

      this.closeSlow(this._newsListsContainer);
      this._newsListsContainer.style.zIndex = 1;
      this._newsListsContainer.style.cursor = "default";
    });
  }

  _addEventClickList() {
    this._parentElement.addEventListener("click", (e) => {
      const list = e.target.closest("li");
      if (
        !list ||
        !list.closest(".news_lists_container").style.opacity ||
        list.closest(".news_lists_container").style.opacity === "0"
      )
        return;

      //////change height to show all the texts
      /// remove hidden for the content
      const content = list.querySelector(".content--lists");
      const title = list.querySelector(".title--lists");

      if (content.classList.contains("hidden")) {
        list.style.height = title.style.height = "fit-content";
        return content.classList.remove("hidden");
      }

      if (!content.classList.contains("hidden")) {
        list.style.height = window.innerWidth > 1024 ? "20%" : "25%";

        title.style.height = "50%";
        content.classList.add("hidden");
      }
    });
  }

  _generateMarkup() {
    return this._data.news
      .map(
        (news) =>
          `<li>
            <div class="lists_date_container">
              ${this._calcNew(news) ? '<div class="new--lists">New</div>' : ""}
              <span class="date--lists">${news.date}</span>
            </div>
            <p class="title--lists">${news.type ? `~${news.type}~ ` : ""}${
            news.title
          }</p>
            <p class="content--lists hidden">${news.content}</p>
          </li>`
      )
      .reverse()
      .join("");
  }

  ' <div class="lists_content_container hidden"></div>';

  ////calc if the news is published within a week
  _calcNew(news) {
    return Math.ceil(
      (new Date() - new Date(news.date)) / (1000 * 60 * 60 * 24)
    ) <= 7
      ? true
      : false;
  }

  _resetLogingForm() {
    this._clearInputField(document.getElementById("login--input_username"));
    this._clearInputField(document.getElementById("login--input_password"));

    this._messageContainer.classList.add("hidden");
  }

  addHandlerSubmit(handler) {
    this._parentElement
      .querySelector(".login--form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const usernameField = document.getElementById("login--input_username");
        const passwordField = document.getElementById("login--input_password");

        const usernameInput = usernameField.value.trim();
        const passwordInput = passwordField.value.trim();

        if (!usernameInput) this.renderErrorInputField(usernameField);

        if (!passwordInput) this.renderErrorInputField(passwordField);

        if (!usernameInput || !passwordInput) {
          this.addEventRemoveErrorInputField();
          return this.renderError(this._errorMessageNoInput);
        }

        handler(usernameInput, passwordInput);
      });
  }

  addHandlerClickForgotPassword(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const link = e.target.closest(".link--forgot_password");
      if (!link) return;

      handler();
    });
  }
}

export default new LoginTopHalfView();
