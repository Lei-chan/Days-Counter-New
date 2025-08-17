import { GOAL_LIMIT } from "../config";
import overlayView from "./overlayView.js";
import overlaySliderView from "./overlaySliderView.js";
class setGoalsSliderView {
  _parentElement = overlayView._parentElement;
  _data;
  _curAccGoalLength;
  _allSlides;
  _type;

  async _submit(handler) {
    try {
      this._allSlides = overlaySliderView._allSlides;

      const goalsInfo = Array.from(this._allSlides)
        .map((s) => {
          const titleInput = s.querySelector("#input--goal_title")?.value;
          const dateInput = s.querySelector("#input--goal_date")?.value;

          if (!titleInput && !dateInput) return;

          return {
            title: titleInput || "",
            date: dateInput || "",
            comments: "",
            toDoLists: "",
            toDoListsCheckbox: [],
          };
        })
        .filter((info) => info && (info.date || info.title));

      if (goalsInfo.length === 0) return;

      handler(goalsInfo, this._type);
    } catch (err) {
      throw err;
    }
  }

  _generateMarkup() {
    this._data = overlaySliderView._data;
    this._curAccGoalLength = overlaySliderView._curAccGoalLength;
    this._type = overlaySliderView.type;

    return `
        <div class="overlay_in--set_goal">
         <button class="btn--x set_goal--btn_x" type="button">&times;</button>
         <h1>${
           this._curAccGoalLength < GOAL_LIMIT
             ? `Let's set your goals! </h1> <p>You can set up to ${GOAL_LIMIT} goals!`
             : `You have maximum number of goals!</h1> <p>You already have ${GOAL_LIMIT} goals!`
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
    for (let i = 0; i < GOAL_LIMIT; i++) {
      const goalTitle = this._data.goals[i]?.title;
      const goalDate = this._data.goals[i]?.date;
      arr.push(`
           <div class="slide" data-slide="${i}">
            <h2>Goal No.${i + 1}</h2>

            <div class="btns--edit_delete btns_edit_delete--slide ${
              this._curAccGoalLength > i ? "" : "hidden"
            } ">
            <button class="btn--edit" data-edit="${i}" type="button">Edit</button>
            <button class="btn--delete" data-delete="${i}" type="button">Delete</button>
            </div>

            <div class="bottom_content">
            <div class="goal_title">
              <p>${
                this._curAccGoalLength > i ? "The" : "Set the"
              } name of your goal No.${i + 1}!</p>
              ${
                this._curAccGoalLength > i
                  ? `<div class="title_outer--slide">
                    <p class="set_goal_title">${
                      goalTitle ? goalTitle : "No title yet"
                    }</p>
                  </div>`
                  : '<input id="input--goal_title" type="text" placeholder="Goal title"></input>'
              }
            </div>
            <div class="goal_date">
             <p>${
               this._curAccGoalLength > i ? "The" : "Set the"
             } date of your goal No.${i + 1}!</p>
             ${
               this._curAccGoalLength > i
                 ? `<p class="set_goal_date">${
                     goalDate ? goalDate : "No date yet"
                   }</p>`
                 : `<input id="input--goal_date" class="datepicker${i}" type="text" placeholder="Click here to select date"></input>`
             }
             </div>
            </div>
           <div class="to_do_lists
           to_do_lists--slide hidden" contenteditable="true">
            <div class="checkbox_container">
            <input type="checkbox" id="checkbox0">
            Let's add To-Do lists here!
            </div>
           </div>
           <div class="comments comments--slide hidden" contenteditable="true">
            Let's add comments here!
           </div>
           </div>`);
    }
    return arr.join("");
  }

  _createDots() {
    let arr = [];
    for (let i = 0; i < GOAL_LIMIT; i++)
      arr.push(
        `<button class="dots_dot" data-dot = "${i}" type="button"></button>`
      );
    return arr.join("");
  }
}

export default new setGoalsSliderView();
