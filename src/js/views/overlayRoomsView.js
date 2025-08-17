import OverlayView from "./overlayView";
import View from "./View";

class OverlayCreateRoomsView extends View {
  overlayView = OverlayView;
  _parentElement = OverlayView._parentElement;

  addHandlerClickX(handler) {
    this.overlayView.addHandlerClickX(handler);
  }

  addHandlerClickOutside(handler) {
    this.overlayView.addHandlerClickOutside(handler);
  }

  addHandlerClick(
    handlerScrach,
    handlerFromYouHave,
    handlerFromId,
    handlerJoinRooms
  ) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.closest(".btn--from_scratch")) return handlerScrach();

      if (e.target.closest(".btn--from_you_have")) return handlerFromYouHave();

      if (e.target.closest(".btn--from_id")) handlerFromId();

      if (e.target.closest(".btn--join_rooms")) handlerJoinRooms();
    });
  }

  _generateMarkup() {
    return `
      <div class="overlay_in--how_to_create">
        <button class="btn--x how_to_create--btn_x">&times;</button>
        <h1>What do you want to do today?</h1>
        <div class="btn_container--create_rooms">
        <h2>Create rooms</h2>
          <button class="btn--from_scratch">From scratch</button>
          <button class="btn--from_you_have">From the goal you already set</button>
          <button class="btn--from_id">Join a room with an id</button>
        </div>
        `;
  }
}

export default new OverlayCreateRoomsView();
