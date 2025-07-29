import View from "./View";

class MainTopSectionView extends View {
  _parentElement = document.querySelector(".top_section");
  _data; //currentAccount

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

  _generateMarkup() {
    const howManyTimesClickMax = Math.max(...this._data.howManyTimesClick);

    return `
      <p class="welcome">Welcome<br>${this._data.username}</p>
      <h1 class="title">${this._data.username}'s Days Counter</h1>
      <div class="times_to_click">You can click <br>${
        howManyTimesClickMax ? howManyTimesClickMax : 0
      } times today!</div>
      <button class="btn--set_goal">Set your goals</button>
      <button class="btn--create_room">Create rooms</button>
    `;
  }
}

export default new MainTopSectionView();
