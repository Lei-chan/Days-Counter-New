import mainDaysCounterContainerView from "./mainDaysCounterContainerView.js";
import overlaySliderView from "./overlaySliderView.js";

class ContentedidableView {
  _maxPage = 2;
  _toDoListsContainers;
  _commentsContainers;
  _curCard;
  _curCardPage;
  _pages;
  _lastModifiedCardToDoLists;
  _lastModifiedCardComments;
  _checkedOrNotArr;
  _contenteditableType; //'daysCounter' or 'slide'
  _data;
  type;

  _eventClickCardSlide(e, clicked) {
    if (
      e.target.closest('[contenteditable="true"]') ||
      e.target.closest("button")
    )
      return;

    if (
      this._lastModifiedCardToDoLists ||
      this._lastModifiedCardToDoLists === 0 ||
      this._lastModifiedCardComments ||
      this._lastModifiedCardComments === 0
    )
      return;

    this._curCard =
      this._contenteditableType === "daysCounter"
        ? +clicked.dataset.card
        : +clicked.dataset.slide;
    this._curCardPage = this._pages[this._curCard];

    this._changePages();

    this._changeTitle(clicked);

    this._handleHidden(clicked);
  }

  _changePages() {
    //when max page or user clicks different card
    this._curCardPage =
      this._curCardPage === this._maxPage ? 0 : ++this._curCardPage;

    this._pages.fill(this._curCardPage, this._curCard, this._curCard + 1);
  }

  _changeTitle(clicked) {
    if (this._contenteditableType === "slide") return;

    let title;

    const changeTitle =
      this.type === "goals"
        ? this._data.goals[this._curCard].title
        : this._data.rooms[this._curCard].title;

    if (this._curCardPage === 0) title = changeTitle || "No title is set!";
    if (this._curCardPage === 1) title = "To-Do lists";
    if (this._curCardPage === 2) title = "Comments";

    clicked.querySelector("h2").textContent = title;
  }

  _handleHidden(clicked) {
    const first = clicked.querySelector(".bottom_content");
    const second = clicked.querySelector(".to_do_lists");
    const third = clicked.querySelector(".comments");

    [first, second, third].forEach((content, i) => {
      content.classList.remove("hidden");
      if (this._curCardPage !== i) content.classList.add("hidden");
    });

    const clickedBtnEdit = clicked.querySelector(".btn--edit");

    this._curCardPage === 0
      ? clickedBtnEdit.classList.remove("hidden")
      : clickedBtnEdit.classList.add("hidden");
  }

  _inputEventModifiedInside(e) {
    this._setLastModifiedAndCheckedArr(e);
    this._removeUnecessaryBrCheckbox(e);
  }

  _setLastModifiedAndCheckedArr(e) {
    const toDoListsContainer = e.target.closest(".to_do_lists");
    const commentsContainer = e.target.closest(".comments");

    if (!toDoListsContainer && !commentsContainer) return;

    if (this._contenteditableType === "daysCounter") {
      if (toDoListsContainer)
        this._lastModifiedCardToDoLists =
          +toDoListsContainer.closest(".card").dataset.card;

      if (commentsContainer)
        this._lastModifiedCardComments =
          +commentsContainer.closest(".card").dataset.card;
    }

    if (this._contenteditableType === "slide") {
      if (toDoListsContainer) {
        this._lastModifiedCardToDoLists =
          +toDoListsContainer.closest(".slide").dataset.slide;
      }

      if (commentsContainer)
        this._lastModifiedCardComments =
          +commentsContainer.closest(".slide").dataset.slide;
    }

    if (!toDoListsContainer) return;
    this._setCheckedOrNotArr(toDoListsContainer);
  }

  _setCheckedOrNotArr(toDoListsContainer) {
    const checkboxesArr = Array.from(
      toDoListsContainer.querySelectorAll('input[type="checkbox"]')
    );
    this._checkedOrNotArr = checkboxesArr.map((checkbox) => checkbox.checked);
  }

  _removeUnecessaryBrCheckbox(e) {
    const checkboxContainers = e.target.querySelectorAll(".checkbox_container");

    checkboxContainers.forEach((container) => {
      if (container.innerHTML === "<br>") container.remove();
    });
  }

  _addEventCheckbox() {
    this._toDoListsContainers.forEach((container) => {
      container.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" || this._curCardPage !== 1) return;

        const texts = container.textContent;

        this._generateCheckbox(texts, container, this._checkedOrNotArr);
      });
    });
  }

  _generateCheckbox(texts, container, checkedOrNotArr) {
    // if (!texts) return;

    //separate texts into each line
    const textsArr = texts.split("\n");

    ////get rid of unecessary spaces and empty string
    const newTexts = textsArr.map((text) => text.trim()).filter((text) => text);

    newTexts.push("");

    container.innerHTML = "";

    const markup = newTexts
      .map(
        (text, i) =>
          `
      <div class="checkbox_container">
      <input type="checkbox" id="checkbox${i}"  ${
            checkedOrNotArr?.at(i) ? "checked" : ""
          }>
      ${text}
      </div>
      `
      )
      .join("");

    container.insertAdjacentHTML("afterbegin", markup);

    this._highlightLastLine(container.lastChild);
  }

  _highlightLastLine(highlightPoint) {
    const range = document.createRange();
    range.setStartAfter(highlightPoint);
    range.setEndAfter(highlightPoint);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  _clickOutside(e, handler) {
    const clicked =
      this._contenteditableType === "daysCounter"
        ? e.target.closest(".page--main")
        : e.target.closest(".overlay");

    if (!clicked) return;

    if (e.target.closest('[contenteditable="true"]')) return;
    if (
      !this._lastModifiedCardToDoLists &&
      this._lastModifiedCardToDoLists !== 0 &&
      !this._lastModifiedCardComments &&
      this._lastModifiedCardComments !== 0
    )
      return;

    const toDoLists =
      this._toDoListsContainers[this._lastModifiedCardToDoLists];
    const comments = this._commentsContainers[this._lastModifiedCardComments];

    const modifiedCard = toDoLists
      ? this._lastModifiedCardToDoLists
      : this._lastModifiedCardComments;

    handler(
      this.type,
      modifiedCard,
      toDoLists?.textContent,
      this._checkedOrNotArr,
      comments?.innerHTML
    );

    this._lastModifiedCardToDoLists = null;
    this._lastModifiedCardComments = null;
  }

  _renderContenteditable() {
    const renderFor =
      this.type === "goals" ? this._data.goals : this._data.rooms;

    renderFor.forEach((goalRoom, i) => {
      this._generateCheckbox(
        goalRoom.toDoLists,
        this._toDoListsContainers[i],
        goalRoom.toDoListsCheckbox
      );

      this._renderComments(goalRoom.comments, this._commentsContainers[i]);
    });
  }

  _renderComments(texts, container) {
    // //I will remove it later
    if (!texts) return;

    container.innerHTML = texts;

    this._highlightLastLine(container.lastChild);
  }

  _resetAllToFirst(parentElement) {
    this._resetAllCardsToFirst(parentElement);

    this._resetAllTitleToFirst(parentElement);

    this._resetAllBtnEditToFirst(parentElement);
  }

  _resetAllCardsToFirst(parentElement) {
    const first = parentElement.querySelectorAll(".bottom_content");
    const second = parentElement.querySelectorAll(".to_do_lists");
    const third = parentElement.querySelectorAll(".comments");

    first.forEach((content, i) => {
      content.classList.remove("hidden");

      second[i].classList.add("hidden");
      third[i].classList.add("hidden");
    });
  }

  _resetAllTitleToFirst(parentElement) {
    if (this._contenteditableType === "slide") return;

    const changeFor =
      this.type === "goals" ? this._data.goals : this._data.rooms;

    const titles = changeFor.map((goalRoom) => goalRoom?.title);

    const titleContainers = parentElement.querySelectorAll("h2");

    titleContainers.forEach((container, i) => {
      const title = titles[i];
      container.textContent = title || "No title is set!";
    });
  }

  _resetAllBtnEditToFirst(parentElement) {
    parentElement
      .querySelectorAll(".btn--edit")
      .forEach((btnEdit) => btnEdit.classList.remove("hidden"));
  }

  _init(type, contenteditableType, data) {
    this.type = type;
    this._contenteditableType = contenteditableType;
    this._data = data;
    this._pages = new Array(
      this.type === "goals" ? this._data.goals.length : this._data.rooms.length
    ).fill(0);
  }
}

export default new ContentedidableView();
