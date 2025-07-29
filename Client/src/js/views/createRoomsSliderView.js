import { ROOM_LIMIT } from "../config";
import overlaySliderView from "./overlaySliderView.js";
import overlayView from "./overlayView.js";
//////Create unique ID/////
import { nanoid } from "nanoid";

class CreateRoomsSliderView {
  _parentElement = overlayView._parentElement;
  _data;
  _curAccRoomLength;
  _allSlides;
  _type;
  _roomType;

  async _submit(handler) {
    try {
      this._allSlides = overlaySliderView._allSlides;

      const roomsInfo = Array.from(this._allSlides)
        .map((s) => {
          const titleInput = s.querySelector("#input--goal_title")?.value;
          const dateInput = s.querySelector("#input--goal_date")?.value;

          if (!titleInput && !dateInput) return;

          return {
            roomId: nanoid(),
            title: titleInput || "",
            date: dateInput || "",
            comments: "",
            toDoLists: "",
            toDoListsCheckbox: [],
          };
        })
        .filter((info) => info && (info.date || info.title));

      if (roomsInfo.length === 0) return;

      handler(roomsInfo, this._type, this._roomType);
    } catch (err) {
      throw err;
    }
  }

  _generateMarkup() {
    this._data = overlaySliderView._data;
    this._curAccRoomLength = this._data.rooms.length;
    this._type = overlaySliderView.type;
    this._roomType = overlaySliderView.roomType;
    return `
        <div class="overlay_in--set_goal">
         <button class="btn--x set_goal--btn_x" type="button">&times;</button>
         <h1>${
           this._curAccRoomLength !== 10
             ? `Let's create your rooms! </h1> <p>You can create up to ${ROOM_LIMIT} rooms!`
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
    for (let i = 0; i < ROOM_LIMIT; i++) {
      const roomTitle = this._data.rooms[i]?.title;
      const roomDate = this._data.rooms[i]?.date;

      arr.push(`
           <div class="slide" data-slide="${i}">
            <h2>Room No.${i + 1}</h2>
            <div class="btns--edit_delete btns_edit_delete--slide ${
              this._curAccRoomLength > i ? "" : "hidden"
            }">
            <button class="btn--edit" data-edit="${i}" type="button">Edit</button>
            <button class="btn--delete" data-delete="${i}" type="button">Delete</button>
            </div>
            <div class="bottom_content">
            <div class="goal_title">
              <p>${
                this._curAccRoomLength > i ? "The" : "Set the"
              } name of your room No.${i + 1}!</p>
              ${
                this._curAccRoomLength > i
                  ? `<p class="set_goal_title">${
                      roomTitle ? roomTitle : "No title yet"
                    }</p>`
                  : '<input id="input--goal_title" type="text" placeholder="Room title"></input>'
              }
            </div>
            <div class="goal_date">
             <p>${
               this._curAccRoomLength > i ? "The" : "Set the"
             } date of your room No.${i + 1}!</p>
             ${
               this._curAccRoomLength > i
                 ? `<p class="set_goal_date">${
                     roomDate ? roomDate : "No date yet"
                   }</p>`
                 : `<input id="input--goal_date" class="datepicker${i}" type="text" placeholder="Click here to select date"></input>`
             }
            </div>
            </div>
            <div class="to_do_lists to_do_lists--slide hidden" contenteditable="true">
             <div class="checkbox_container">
              <input type="checkbox" id="checkbox0">
              Let's add To-Do lists here!
             </div>
            </div>
            <div class="comments comments--slide hidden" contenteditable="true">
             Let's add comments here!
            </div>
           </div>
           `);
    }
    return arr.join("");
  }

  _createDots() {
    let arr = [];
    for (let i = 0; i < ROOM_LIMIT; i++)
      arr.push(
        `<button class="dots_dot" data-dot = "${i}" type="button"></button>`
      );
    return arr.join("");
  }
}

export default new CreateRoomsSliderView();
