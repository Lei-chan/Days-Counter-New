import View from "./View";

class OverlayCreateRoomsView extends View {
  _parentElement = document.querySelector(".overlay");

  _generateMarkup() {
    return `
      <div class="overlay_in--how_to_create">
        <button class="btn--x how_to_create--btn_x">&times;</button>
        <h1>How do you want to create a room?</h1>
        <div class="btn_container">
          <button class="btn--from_scrach">From scrach</button>
          <button class="btn--from_you_have">From the goal you already set</button>
          <button class="btn--from_id">Join a room with the id</button>
        </div>
      </div>`;
  }
}

export default new OverlayCreateRoomsView();
