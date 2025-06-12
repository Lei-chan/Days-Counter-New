import View from "./View";
import { GOAL_LIMIT, SLIDER_WIDTH } from "../js/config.js";
import overlayView from "./overlayView.js";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";

class OverlaySetGoalsView extends View {
  _parentElement = document.querySelector(".overlay");
  _allSlides;
  _currentSlide;
  _data;
  _curAccGoalLength;

  addHandlerSubmit(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".slider--btn_next");
      if (!btn) return;

      const goalsInfo = Array.from(this._allSlides)
        .map((s) => {
          const titleInput = s.querySelector(".input--goal_title")?.value;
          const dateInput = s.querySelector(".input--goal_date")?.value;

          if (!titleInput && !dateInput) return;

          return {
            title: titleInput,
            date: dateInput,
            comments: [],
            toDoList: [],
          };
        })
        .filter((info) => info && (info.date || info.title));

      if (goalsInfo.length === 0) return;

      handler(goalsInfo);
    });
  }

  addHandlerClickX(handler) {
    this._parentElement.addEventListener("click", function (e) {
      e.preventDefault();
      const btn = e.target.closest(".btn--x");
      if (!btn) return;

      handler();
    });
  }

  addHandlerClickOutside(handler) {
    this._parentElement.addEventListener("click", function (e) {
      if (e.target.className !== "overlay") return;

      handler();
    });
  }

  addEventClickRight() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--right");
      if (!btn) return;

      this._goToNext();
    });
  }

  addEventClickLeft() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--left");
      if (!btn) return;

      this._goToPrev();
    });
  }

  addEventArrowKey() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight") this._goToNext();
      if (e.key === "ArrowLeft") this._goToPrev();
    });
  }

  addEventClickDot() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".dots_dot");
      if (!btn) return;
      this._currentSlide = +btn.dataset.dot;
      this._goToSlide(+btn.dataset.dot);
      this._activeDot();
    });
  }

  _goToNext() {
    //current slide is 0 base!
    if (this._currentSlide === GOAL_LIMIT - 1) this._currentSlide = 0;
    else this._currentSlide++;

    this._goToSlide(this._currentSlide);
    this._activeDot();
  }

  _goToPrev() {
    //current slide is 0 base!
    if (this._currentSlide === 0) this._currentSlide = GOAL_LIMIT - 1;
    else this._currentSlide--;

    this._goToSlide(this._currentSlide);
    this._activeDot();
  }

  _generateMarkup() {
    this._curAccGoalLength = this._data.goals?.length;
    return `
      <form class="overlay_in--set_goal">
       <button class="btn--x set_goal--btn_x">&times;</button>
       <h1>${
         this._curAccGoalLength !== 10
           ? "Let's set your goals!"
           : "You have maximum number of goals!"
       }</h1>
       <p>You can set up to ${GOAL_LIMIT} goals!</p>
       <div class="slider">
        ${this._createSlider()}
        <button class="slider--btn btn--left">&larr;</button>
        <button class="slider--btn btn--right">&rarr;</button>
        <div class="dots">${this._createDots()}</div>
       </div>
       <button class="btn--next slider--btn_next">&larr;</button>
      </form>`;
  }

  _createSlider() {
    let arr = [];
    for (let i = 0; i < GOAL_LIMIT; i++)
      arr.push(`
         <div class="slide" data-goto="${i}">
          <h2>Goal No.${i + 1}</h2>
          <div class="goal_title">
            <p>${
              this._curAccGoalLength > i ? "The" : "Set the"
            } name of your goal No.${i + 1}!</p>
            ${
              this._curAccGoalLength > i
                ? `<p class="set_goal_title">${this._data.goals[i].title}</p>`
                : '<input class="input--goal_title" type="text" placeholder="Goal title"></input>'
            }
          </div>
          <div class="goal_date">
           <p>${
             this._curAccGoalLength > i ? "The" : "Set the"
           } date of your goal No.${i + 1}!</p>
           ${
             this._curAccGoalLength > i
               ? `<p class="set_goal_date">${this._data.goals[i].date}</p>`
               : `<input class="input--goal_date datepicker${i}" type="text" placeholder="Click here to select date"></input>`
           }
          </div>
         </div>`);
    return arr.join("");
  }

  _createDots() {
    let arr = [];
    for (let i = 0; i < GOAL_LIMIT; i++)
      arr.push(`<button class="dots_dot" data-dot = "${i}"></button>`);
    return arr.join("");
  }

  _goToSlide() {
    this._allSlides = document.querySelectorAll(".slide");
    this._allSlides.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${
          SLIDER_WIDTH * (i - this._currentSlide)
        }px)`)
    );
  }

  _activeDot() {
    const allDots = document.querySelectorAll(".dots_dot");
    allDots.forEach((dot) => {
      dot.classList.remove("dots_dot--active");
      dot.blur();
      if (this._currentSlide === +dot.dataset.dot)
        dot.classList.add("dots_dot--active");
    });
  }

  _setDatePicker() {
    for (let i = 0; i < GOAL_LIMIT; i++)
      new AirDatepicker(`.datepicker${i}`, {
        startDate: new Date(),
        locale: localeEn,
        position: "top right",
      });
  }

  init(currentAccount) {
    this._currentSlide = 0;
    this.renderToParentEle(currentAccount);
    this._goToSlide(this._currentSlide);
    this._setDatePicker();
    this._activeDot();
  }
}

export default new OverlaySetGoalsView();
