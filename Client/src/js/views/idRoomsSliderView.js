import { ROOM_LIMIT, ROOM_ID_LENGTH } from "../config";
import overlayMessageSpinnerView from "./overlayMessageSpinnerView.js";
import overlaySliderView from "./overlaySliderView.js";
import overlayView from "./overlayView.js";

class IdRoomsSliderView {
  _parentElement = overlayView._parentElement;
  _data;
  _curAccRoomLength;
  _slideMax;
  _allSlides;
  _type;
  _roomType;

  async _submit(handler) {
    this._allSlides = overlaySliderView._allSlides;

    const curRoomIds = this._data.rooms.map((room) => room.roomId);

    const roomIdInputs = Array.from(this._allSlides).map((s) => {
      const idInput = s?.querySelector("#input--id")?.value.trim();

      return idInput;
    });

    roomIdInputs.forEach((id) => {
      if (id && id.length !== ROOM_ID_LENGTH)
        overlayMessageSpinnerView._asyncInit(
          "message",
          "error",
          overlayMessageSpinnerView._errorMessageInvalidId
        );

      if (id && curRoomIds.includes(id))
        overlayMessageSpinnerView._asyncInit(
          "message",
          "error",
          overlayMessageSpinnerView._errorMessageRoomAlreadyExists
        );
    });

    const newRoomIds = roomIdInputs.filter(
      (id) => id && id.length === ROOM_ID_LENGTH && !curRoomIds.includes(id)
    );

    if (!newRoomIds.length) return;

    handler(newRoomIds, this._type, this._roomType);
  }

  _generateMarkup() {
    this._data = overlaySliderView._data;
    this._curAccRoomLength = this._data.rooms.length;
    this._type = overlaySliderView.type;
    this._roomType = overlaySliderView.roomType;
    this._slideMax = ROOM_LIMIT - this._data.rooms.length;

    return `
            <div class="overlay_in--set_goal">
             <button class="btn--x set_goal--btn_x" type="button">&times;</button>
             <h1>${
               this._curAccRoomLength !== 10
                 ? `Let's join rooms! </h1> <p>You can join up to ${ROOM_LIMIT} rooms! (You can still set ${this._slideMax} more rooms!)`
                 : `You have maximum number of rooms!</h1> <p>You already have ${ROOM_LIMIT} rooms!`
             }</p>
             <div class="slider">
              ${this._createSlider()}
              <button class="slider--btn btn--left" type="button">&larr;</button>
              <button class="slider--btn btn--right" type="button">&rarr;</button>
              <div class="dots">${this._createDots()}</div>
             </div>
             <button class="btn--next slider--btn_next">&larr;</button>
            </div>`;
  }

  _createSlider() {
    let arr = [];
    for (let i = 0; i < this._slideMax; i++) {
      arr.push(`
               <div class="slide" data-goto="${i}">
                <h3>Please enter room id</h3>
                 <input id="input--id" type="text" placeholder="Room ID"></input>
               </div>`);
    }
    return arr.join("");
  }

  _createDots() {
    let arr = [];
    for (let i = 0; i < this._slideMax; i++)
      arr.push(
        `<button class="dots_dot" data-dot="${i}" type="button"></button>`
      );
    return arr.join("");
  }
}

export default new IdRoomsSliderView();
