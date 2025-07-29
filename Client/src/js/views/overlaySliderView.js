import { GOAL_LIMIT, ROOM_LIMIT, SLIDER_WIDTH } from "../config.js";
import AirDatepicker from "air-datepicker";
import "air-datepicker/air-datepicker.css";
import localeEn from "air-datepicker/locale/en";

import View from "./View.js";
import overlayView from "./overlayView.js";
import overlayMessageSpinnerView from "./overlayMessageSpinnerView.js";
import contenteditableView from "./contenteditableView.js";
import setGoalsSliderView from "./setGoalsSliderView.js";
import createRoomsSliderView from "./createRoomsSliderView.js";
import selectRoomsSliderView from "./selectRoomsSliderView.js";
import idRoomsSliderView from "./idRoomsSliderView.js";
import { mark } from "regenerator-runtime";
import { nanoid } from "nanoid";
import mainWholeView from "./mainWholeView.js";

class OverlaySliderView extends View {
  _parentElement = overlayView._parentElement;
  _allSlides;
  _currentSlide;
  _curAccGoalLength;
  _editGoalRoomIndex;
  _deleteGoalRoomIndex;
  _message;
  _errorMessage = "Something went wrong. Please try again this later!";
  _eventAttached;
  _data;
  type; //'goals' or 'rooms'
  roomType; //'create', 'select', or 'id'

  _addEvents() {
    this._addEventClickSlide();
    this._addEventClickRight();
    this._addEventClickLeft();
    this._addEventArrowKey();
    this._addEventClickDot();
    this._addEventClickEdit();
    this._addEventClickDelete();
    this._addEventClickSelect();
  }

  _addEventClickSlide() {
    this._parentElement.addEventListener("click", (e) => {
      const clickedSlide = e.target.closest(".slide");
      if (
        !clickedSlide ||
        this.roomType === "select" ||
        this.roomType === "id" ||
        clickedSlide.querySelector(".btn--finish")
      )
        return;

      //when the slide doesn't have set goal/room
      const clickedSlideIndex = +clickedSlide.dataset.slide;

      if (
        (this.type === "goals" && !this._data.goals[clickedSlideIndex]) ||
        (this.type === "rooms" && !this._data.rooms[clickedSlideIndex])
      )
        return;

      if (e.target.closest('input[type="text"]')) return;

      contenteditableView._eventClickCardSlide(e, clickedSlide);
    });
  }

  _addEventClickRight() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--right");
      if (!btn) return;

      this._goToNext();
    });
  }

  _addEventClickLeft() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--left");
      if (!btn) return;

      this._goToPrev();
    });
  }

  _addEventArrowKey() {
    document.addEventListener("keydown", (e) => {
      const inputFields = Array.from(
        this._parentElement.querySelectorAll("input")
      ).filter((input) => input.type !== "checkbox");

      const ifInputFieldFocused = inputFields
        .map((input) => document.activeElement === input)
        .some((ifFocused) => ifFocused === true);

      if (ifInputFieldFocused) return;

      if (e.key === "ArrowRight") this._goToNext();
      if (e.key === "ArrowLeft") this._goToPrev();
    });
  }

  _addEventClickDot() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".dots_dot");
      if (!btn) return;

      this._currentSlide = +btn.dataset.dot;
      this._goToSlide(+btn.dataset.dot);
      this._activeDot();
    });
  }

  _addEventClickEdit() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--edit");
      if (!btn) return;

      const curSlide = btn.closest(".slide");

      const editGoalRoomIndex = +curSlide.dataset.slide;

      this._changeGoalRoomForEdit(editGoalRoomIndex);
    });
  }

  _changeGoalRoomForEdit(editGoalRoomIndex) {
    this._editGoalRoomIndex = editGoalRoomIndex;

    const curSlide = this._allSlides[editGoalRoomIndex];

    const goalOrRoom = this.type.slice(0, 4);
    const curSlideTitle = curSlide.querySelector(".set_goal_title").textContent;
    const curSlideDate = curSlide.querySelector(".set_goal_date").textContent;

    const markup = `
      <h2>${this.type === "goals" ? "Goal" : "Room"} No.${
      editGoalRoomIndex + 1
    }</h2>
      <div class="btns--edit_delete btns_edit_delete--slide">
      <button class="btn--finish" data-finish="${editGoalRoomIndex}" type="button">Finish</button>
      <button class="btn--delete" data-delete="${editGoalRoomIndex}" type="button">Delete</button>
      </div>
      <div class="bottom_content">
      <div class="goal_title">
        <p>Edit the name of your ${goalOrRoom} No.${editGoalRoomIndex + 1}!</p>
        <input id="input--goal_title" type="text" placeholder="${goalOrRoom} title"></input>
      </div>
      <div class="goal_date">
        <p>Edit the date of your ${goalOrRoom} No.${editGoalRoomIndex + 1}!</p>
        <input id="input--goal_date" class="datepicker${editGoalRoomIndex}" type="text" placeholder="Click here to select date"></input>
      </div>
      </div>`;

    this.render(curSlide, markup);

    curSlide.querySelector("#input--goal_title").value =
      curSlideTitle === "No title yet" ? "" : curSlideTitle;
    curSlide.querySelector("#input--goal_date").value =
      curSlideDate === "No date yet" ? "" : curSlideDate;

    this._setDatePickerOne(editGoalRoomIndex);

    ////hide submit button
    this._parentElement
      .querySelector(".slider--btn_next")
      .classList.add("hidden");
  }

  _addHandlerClickFinishEditing(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--finish");
      if (!btn) return;

      const curSlide = btn.closest(".slide");

      const titleInput = curSlide
        .querySelector("#input--goal_title")
        .value.trim();
      const dateInput = curSlide
        .querySelector("#input--goal_date")
        .value.trim();

      if (!titleInput && !dateInput) return;

      const updateFor =
        this.type === "goals"
          ? this._data.goals[this._editGoalRoomIndex]
          : this._data.rooms[this._editGoalRoomIndex];

      let editedGoalRoomInfo = {
        title: titleInput || "",
        date: dateInput || "",
        comments: updateFor.comments || "",
        toDoLists: updateFor.toDoLists || "",
        toDoListsCheckbox: updateFor.toDoListsCheckbox || [],
      };

      if (this.type === "rooms")
        editedGoalRoomInfo = {
          roomId: updateFor.roomId,
          usernames: updateFor.usernames || [],
          ...editedGoalRoomInfo,
        };

      handler(this._editGoalRoomIndex, editedGoalRoomInfo, this.type);

      this._editGoalRoomIndex = null;
    });
  }

  _addEventClickDelete() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--delete");
      if (!btn) return;

      const deleteGoalRoomIndex = +btn.closest(".slide").dataset.slide;

      this._deleteGoalRoomIndex = deleteGoalRoomIndex;

      overlayMessageSpinnerView._asyncInit(
        "message",
        "question",
        `Are you sure you want to delete this ${
          this.type === "goals" ? "goal" : "room"
        }?`
      );
    });
  }

  _addEventClickSelect() {
    this._parentElement.addEventListener("click", function (e) {
      selectRoomsSliderView._select(e);
    });
  }

  addHandlerClickX(handler) {
    overlayView.addHandlerClickX(() => {
      handler();
      this._editGoalRoomIndex = null;
      this._deleteGoalRoomIndex = null;
    });
  }

  addHandlerClickOutside(handler) {
    overlayView.addHandlerClickOutside(() => {
      handler();
      this._editGoalRoomIndex = null;
      this._deleteGoalRoomIndex = null;
    });
  }

  _addHandlerClickEscapeClose(handler) {
    this._addEventClickEscapeClose(this._keyEventRemoveFocus, handler);
  }

  _keyEventRemoveFocus() {
    const mainWholeViewParentEle = mainWholeView._parentElement;

    const btns = mainWholeViewParentEle.querySelectorAll("button");

    btns.forEach((btn) => btn.blur());
  }

  _addHandlerIAmSure(handler) {
    overlayMessageSpinnerView._addHandlerClickIAmSure(() => {
      if (!this._deleteGoalRoomIndex && this._deleteGoalRoomIndex !== 0) return;
      //check if delete room was selected by existing goal

      let selectedGoal;
      if (this.type === "rooms") {
        const deleteRoom = this._data.rooms[this._deleteGoalRoomIndex];

        selectedGoal = this._data.goals.find(
          (goal) =>
            goal.title === deleteRoom.title &&
            goal.date === deleteRoom.date &&
            goal.selected
        );
      }

      handler(this._deleteGoalRoomIndex, this.type, selectedGoal, "slide");

      this._deleteGoalRoomIndex = null;
    });
  }

  addHandlerSubmit(handlerSubmit, handlerSaveSelected) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".slider--btn_next");
      if (!btn) return;

      ///submit for goals
      if (this.type === "goals")
        return setGoalsSliderView._submit(handlerSubmit);

      //submit for rooms created from scratch
      if (this.type === "rooms" && this.roomType === "create")
        return createRoomsSliderView._submit(handlerSubmit);

      //submit for rooms created from existing goals
      if (this.type === "rooms" && this.roomType === "select")
        return selectRoomsSliderView._submit(
          handlerSubmit,
          handlerSaveSelected
        );

      //submit for rooms created from id
      idRoomsSliderView._submit(handlerSubmit);
    });
  }

  _addEventModifiedInside() {
    this._parentElement.addEventListener("input", (e) => {
      contenteditableView._inputEventModifiedInside(e);
    });
  }

  _addEventStopPropagationCheckbox() {
    this._parentElement
      .querySelectorAll('input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("click", (e) => {
          e.stopPropagation();
        });
      });
  }

  addHandlerClickOutsideContenteditable(handler) {
    this._parentElement.addEventListener("click", (e) => {
      contenteditableView._clickOutside(e, handler);
    });
  }

  _slideMax() {
    //When create goals/rooms from scratch, or join rooms with ids  => GOAL_LIMIT
    //when select goals for rooms => goal length
    //when join rooms with ids => amount of rooms user can still set

    let slideMax;
    if (
      this.type === "goals" ||
      (this.type === "rooms" && this.roomType === "create")
    )
      slideMax = GOAL_LIMIT;

    if (this.type === "rooms" && this.roomType === "select")
      slideMax = this._curAccGoalLength;

    if (this.type === "rooms" && this.roomType === "id")
      slideMax = ROOM_LIMIT - this._data.rooms.length;

    return slideMax;
  }

  _goToNext() {
    //current slide is 0 base!
    if (this._currentSlide === this._slideMax() - 1) this._currentSlide = 0;
    else this._currentSlide++;

    this._goToSlide(this._currentSlide);
    this._activeDot();
  }

  _goToPrev() {
    //current slide is 0 base!
    if (this._currentSlide === 0) this._currentSlide = this._slideMax() - 1;
    else this._currentSlide--;

    this._goToSlide(this._currentSlide);
    this._activeDot();
  }

  _generateMarkup() {
    this._curAccGoalLength = this._data.goals.length;

    if (this.type === "goals")
      return setGoalsSliderView._generateMarkup(this._data);

    if (this.type === "rooms" && this.roomType === "create")
      return createRoomsSliderView._generateMarkup(this._data);

    if (this.type === "rooms" && this.roomType === "select")
      return selectRoomsSliderView._generateMarkup(this._data);

    return idRoomsSliderView._generateMarkup(this._data);
  }

  _goToSlide(slideIndex = this._currentSlide) {
    this._allSlides = document.querySelectorAll(".slide");
    this._allSlides.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${SLIDER_WIDTH * (i - slideIndex)}%)`)
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

  _setDatePickerOne(index) {
    new AirDatepicker(`.datepicker${index}`, {
      startDate: new Date(),
      locale: localeEn,
      position: "top right",
    });
  }

  init(curAccount, clickedCardIndex) {
    this._currentSlide = 0;
    this.renderToParentEle(curAccount);
    this._goToSlide(clickedCardIndex);
    this._setDatePicker();
    this._activeDot();

    if (this.roomType === "select" || this.roomType === "id") return;

    contenteditableView._init(this.type, "slide", this._data);

    contenteditableView._toDoListsContainers =
      this._parentElement.querySelectorAll(".to_do_lists");

    contenteditableView._commentsContainers =
      this._parentElement.querySelectorAll(".comments");

    contenteditableView._renderContenteditable();

    if (this._eventAttached) return;

    contenteditableView._addEventCheckbox();
    this._addEventStopPropagationCheckbox();
    this._addEventModifiedInside();

    this._eventAttached = true;
  }
}

export default new OverlaySliderView();
