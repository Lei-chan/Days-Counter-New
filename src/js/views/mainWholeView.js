import View from "./View";
class MainWholeView extends View {
  _parentElement = document.querySelector(".page--main");
  // _renderInitContainer = document.querySelector(".btn_warning_container");
  _messageContainer = this._parentElement.querySelector(".warning--counter");
  _data;
  type;
  _errorMessage =
    "You can not click the button anymore! <br> Wait for another day ;)";

  addHandlerClickCounter(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--count");
      if (!btn) return;

      //If user can not click anymore
      const howManyTimesClick =
        this.type === "goals"
          ? this._data.howManyTimesClick
          : this._data.howManyTimesClickRooms;

      if (!Math.max(...howManyTimesClick)) return this.renderError();

      handler(this.type);
    });
  }

  _addHandlerClickHowToUse(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--app_explanation");
      if (!btn) return;

      handler();
    });
  }

  addHandlerClickSetting(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--settings");
      if (!btn) return;

      handler();
    });
  }

  _handleHiddenBtnWarning() {
    const btnContainer = this._parentElement.querySelector(
      ".btn_warning_container"
    );

    //If there are no goals
    const length =
      this.type === "goals" ? this._data.goals.length : this._data.rooms.length;

    !length
      ? btnContainer.classList.add("hidden")
      : btnContainer.classList.remove("hidden");

    this._messageContainer.classList.add("hidden");
  }

  init(curUser) {
    this._data = curUser;

    this._handleHiddenBtnWarning();
    // this._messageContainer.classList.add("hidden");
  }
}

export default new MainWholeView();
