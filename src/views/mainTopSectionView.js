import View from "./View";

class MainTopSectionView extends View {
  _parentElement = document.querySelector(".top_section");

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
    return `
      <p class="welcome">Welcome<br>${this._data.username}</p>
      <h1 class="title">${this._data.username}'s Days Counter</h1>
      <button class="btn--set_goal">Set your goals</button>
      <button class="btn--create_room">Create rooms</button>
    `;
  }
}

export default new MainTopSectionView();
