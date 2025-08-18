import View from "./View";
import overlayMessageSpinnerView from "./overlayMessageSpinnerView.js";

class MainTopSectionView extends View {
  _parentElement = document.querySelector(".top_section");
  _btnSwitchStyleLeft;
  _data; //currentAccount
  type;

  constructor() {
    super();
    this._addEventClickLogout();
  }

  addHandlerClickSwitch(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--switch");
      if (!btn) return;

      btn.style.left = btn.style.left === "50%" ? "0%" : "50%";

      this._btnSwitchStyleLeft = btn.style.left;

      const type = btn.style.left === "50%" ? "goals" : "rooms";

      handler(type);
    });
  }

  _changeSwitch() {
    this._parentElement.querySelector(".btn--switch").style.left =
      this.type === "goals" ? "50%" : "0%";
  }

  addHandlerClickGoals(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--set_goal");
      if (!btn) return;

      handler();
    });
  }

  addHandlerClickRooms(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--create_room");
      if (!btn) return;

      handler();
    });
  }

  _addEventClickLogout() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--logout");
      if (!btn) return;

      overlayMessageSpinnerView._asyncInit(
        "message",
        "question",
        overlayMessageSpinnerView._questionLogout,
        "logout"
      );
    });
  }

  addHandlerClickIAmSure(handler) {
    overlayMessageSpinnerView._addHandlerClickIAmSure(
      null,
      () => {
        if (overlayMessageSpinnerView._lastClickedForIAmSure !== "logout")
          return;
        handler();
      },
      null
    );
  }

  _generateMarkup() {
    const howManyTimesClick =
      this.type === "goals"
        ? this._data.howManyTimesClick
        : this._data.howManyTimesClickRooms;

    const howManyTimesClickMax = howManyTimesClick.length
      ? Math.max(...howManyTimesClick)
      : 0;

    return `
       <div class="switch--goals_rooms">
        <div class="switch--goals">goals</div>
        <div class="switch--rooms">rooms</div>
        <button class="btn--switch" style="left: ${
          this._btnSwitchStyleLeft ? this._btnSwitchStyleLeft : "50%"
        }"></button>
      </div>
      <p class="welcome">Welcome<br>${this._data.username}</p>
      <h1 class="title">${this._changeTitleStyle()}</h1>
      <div class="times_to_click">You can click <br>${howManyTimesClickMax} times!</div>
      <button class="btn--set_goal">Goals</button>
      <button class="btn--create_room">Rooms</button>
      <button class="btn--logout">Logout</button>
    `;
  }

  _changeTitleStyle() {
    const userViewportWidth = window.innerWidth;
    // console.log(userViewportWidth);

    return userViewportWidth <= 320
      ? `${this._data.username}'s<br>${
          this.type === "rooms"
            ? "".padStart(1, "\u00A0") + "Rooms"
            : "Days Counter"
        }`
      : `${this._data.username}'s ${
          this.type === "rooms"
            ? "".padStart(1, "\u00A0") + "Rooms"
            : "Days Counter"
        }`;
  }
}

export default new MainTopSectionView();
