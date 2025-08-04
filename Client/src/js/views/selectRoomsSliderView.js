import { GOAL_LIMIT } from "../config";
import overlaySliderView from "./overlaySliderView.js";
import overlayView from "./overlayView.js";
//////Create unique ID/////
import { nanoid } from "nanoid";

///do select room btn!!!!!!!

class SelectRoomsSliderView {
  _parentElement = overlayView._parentElement;
  _curAccGoalLength;
  _allSlides;
  _data;
  _type;
  _roomType;

  _select(e) {
    const btn = e.target.closest(".btn--select");
    if (!btn) return;

    // if (btn.classList.contains("permanent")) return;

    btn.classList.toggle("btn--select__active");

    btn.textContent = btn.classList.contains("btn--select__active")
      ? "Selected"
      : "Create room with this";
  }

  async _submit(handlerSubmit, handlerSaveSelected) {
    try {
      this._allSlides = overlaySliderView._allSlides;

      const btnSelected = Array.from(
        this._parentElement.querySelectorAll(".btn--select__active")
      );

      if (!btnSelected.length) return;

      btnSelected.forEach((btn) => {
        btn.classList.add("permanent");
      });

      const newSelectedGoalsIndex = this._newSelectedGoalsIndex(btnSelected);

      // handlerSaveSelected(newSelectedGoalsIndex);

      const roomsInfo = newSelectedGoalsIndex.map((newSelectedIndex) => {
        const selectedSlide = this._allSlides[newSelectedIndex];
        const selectedSlideTitle =
          selectedSlide.querySelector(".set_goal_title");
        const selectedSlideDate = selectedSlide.querySelector(".set_goal_date");

        const title =
          selectedSlideTitle.textContent === "No title yet"
            ? ""
            : selectedSlideTitle.textContent;

        const date =
          selectedSlideDate.textContent === "No date yet"
            ? ""
            : selectedSlideDate.textContent;

        return {
          roomId: nanoid(),
          title: title,
          date: date,
          comments: "",
          toDoLists: "",
          toDoListsCheckbox: "",
        };
      });

      if (!roomsInfo.length) return;

      handlerSubmit(
        roomsInfo,
        this._type,
        this._roomType,
        newSelectedGoalsIndex
      );
    } catch (err) {
      throw err;
    }
  }

  _newSelectedGoalsIndex(btnSelected) {
    const selectedGoalsIndex = btnSelected.map((btn) => +btn.dataset.select);

    //remove goals selected in the past
    const newSelectedGoalsIndex = selectedGoalsIndex.filter(
      (index) => !this._data.goals[index].selected
    );

    return newSelectedGoalsIndex;
  }

  _generateMarkup() {
    this._data = overlaySliderView._data;
    this._curAccGoalLength = overlaySliderView._curAccGoalLength;
    this._type = overlaySliderView.type;
    this._roomType = overlaySliderView.roomType;

    return `
        <div class="overlay_in--set_goal">
         <button class="btn--x set_goal--btn_x" type="button">&times;</button>
         <h1>${
           this._curAccGoalLength !== 0
             ? `Let's create your rooms!</h1> <p>You can create up to ${GOAL_LIMIT} rooms!`
             : "You haven't set goals yet!</h1> <p>Create rooms from scratch or set goals first!"
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
    for (let i = 0; i < this._curAccGoalLength; i++) {
      arr.push(`
           <div class="slide" data-goto="${i}">
            <h2>Goal No.${i + 1}</h2>
            <button class=${
              this._data.goals[i].selected
                ? "btn--select__active permanent"
                : "btn--select"
            } data-select="${i}" type="button"> ${
        this._data.goals[i].selected ? "Already have" : "Create room with this"
      }</button>
            <div class="goal_title">
              <p> The name of your goal No.${i + 1}!</p>
              <p class="set_goal_title">${this._data.goals[i]?.title}</p>
            </div>
            <div class="goal_date">
             <p>The date of your goal No.${i + 1}!</p>
             <p class="set_goal_date">${this._data.goals[i]?.date}</p>
            </div>
           </div>`);
    }
    return arr.join("");
  }

  _createDots() {
    let arr = [];
    for (let i = 0; i < this._curAccGoalLength; i++)
      arr.push(
        `<button class="dots_dot" data-dot = "${i}" type="button"></button>`
      );
    return arr.join("");
  }
}

export default new SelectRoomsSliderView();
