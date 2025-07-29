import View from "./View";
import mainWholeView from "./mainWholeView.js";
import contenteditableView from "./contenteditableView.js";
import overlayMessageSpinnerView from "./overlayMessageSpinnerView.js";

class MainDaysCounterContainerView extends View {
  _parentElement = document.querySelector(".days_counter--container");
  _deleteGoalRoomIndex;
  // _eventListenerAttachedGoals;
  // _eventListenerAttachedRooms;
  _eventAttached;
  _data; //currentAccount
  type;

  _addEvents() {
    this._addEventClickCopy();
    this._addEventMouseoverUsers();
    this._addEventMouseoutUsers();
    this._addEventClickDelete();
    this._addEventClickCard();
  }

  _addEventClickCopy() {
    this._parentElement.addEventListener("click", async (e) => {
      try {
        const btn = e.target.closest(".btn--room_id_copy");
        if (!btn) return;

        const clickedCard = btn.closest(".card");
        const clickedCardIndex = +clickedCard.dataset.card;

        const roomId = this._data.rooms[clickedCardIndex].roomId;

        await navigator.clipboard.writeText(roomId);

        const copiedExplanation = clickedCard.querySelector(
          ".copied_explanation"
        );

        btn.classList.add("room_id--copied");
        this.open(copiedExplanation);

        await this._setTimeout();

        btn.classList.remove("room_id--copied");
        this.close(copiedExplanation);
      } catch (err) {
        overlayMessageSpinnerView._asyncInit(
          "message",
          "error",
          overlayMessageSpinnerView._errorMessageUnableToCopy
        );
      }
    });
  }

  _addEventMouseoverUsers() {
    this._parentElement.addEventListener("mouseover", (e) => {
      this._usernamesContainers = Array.from(
        this._parentElement.querySelectorAll(".usernames_container")
      );

      const btn = e.target.closest(".btn--usernames");
      if (!btn) return;

      const cardNumber = +btn.dataset.btnUsernames;

      this._usernamesContainers[cardNumber].style.opacity = 1;
    });
  }

  _addEventMouseoutUsers() {
    this._parentElement.addEventListener("mouseout", (e) => {
      const btn = e.target.closest(".btn--usernames");
      if (!btn) return;

      const cardNumber = +btn.dataset.btnUsernames;

      this._usernamesContainers[cardNumber].style.opacity = 0;
    });
  }

  _addHandlerClickEdit(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--edit");
      if (!btn) return;

      const editGoalRoomIndex = +btn.closest(".card").dataset.card;

      handler(editGoalRoomIndex, this.type);
    });
  }

  _addEventClickDelete() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--delete");
      if (!btn) return;

      const deleteGoalRoomIndex = +btn.closest(".card").dataset.card;

      this._deleteGoalRoomIndex = deleteGoalRoomIndex;

      overlayMessageSpinnerView._asyncInit(
        "message",
        "question",
        `Are you sure you want to delete this ${
          this.type === "goals" ? "goal" : "room"
        }?`,
        "delete"
      );
    });
  }

  _addHandlerIAmSure(handler) {
    overlayMessageSpinnerView._addHandlerClickIAmSure(() => {
      if (overlayMessageSpinnerView._lastClickedForIAmSure !== "delete") return;
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

      handler(
        this._deleteGoalRoomIndex,
        this.type,
        selectedGoal,
        "daysCounter"
      );
    });
  }

  _addEventClickCard() {
    this._parentElement.addEventListener("click", (e) => {
      const clickedCard = e.target.closest(".card");

      if (
        !clickedCard ||
        e.target.closest(".usernames_container") ||
        e.target.closest(".room_id_container")
      )
        return;

      contenteditableView._eventClickCardSlide(e, clickedCard);
    });
  }

  _addEventModifiedInside() {
    this._parentElement.addEventListener("input", (e) => {
      contenteditableView._inputEventModifiedInside(e);
    });
  }

  addHandlerClickOutside(handler) {
    mainWholeView._parentElement.addEventListener("click", (e) => {
      contenteditableView._clickOutside(e, handler);
    });
  }

  _handleHidden() {
    const roomIds = this._parentElement.querySelectorAll(".room_id_container");

    const btnUsernames = Array.from(
      this._parentElement.querySelectorAll(".btn--usernames")
    );

    roomIds.forEach((roomId, i) => {
      const btnUsername = btnUsernames[i];

      //add/remove hidden for room Id & btn username
      this.type === "goals"
        ? roomId.classList.add("hidden")
        : roomId.classList.remove("hidden");

      this.type === "goals"
        ? btnUsername.classList.add("hidden")
        : btnUsername.classList.remove("hidden");
    });
  }

  _generateMarkup() {
    const calcFor = this.type === "goals" ? this._data.goals : this._data.rooms;

    this._setDaysCounterStyle(calcFor.length);

    if (!calcFor.length)
      return `
         <p class="start_explanation">Let's first start by setting your ${this.type}!</p>`;

    const markup = calcFor
      .map((goal, i) => {
        const remainingDaysPrev =
          this.type === "goals"
            ? this._data.remainingDaysPrev[i]
            : this._data.remainingDaysPrevRooms[i];

        const roomIdUsernames = `
        <div class="room_id_container hidden">
          <span class="room_id">Room ID: ${goal?.roomId}</span> 
          <button class="btn--room_id_copy"></button>
          <span class="copied_explanation hidden">copied!</span>
        </div>
        <div class="usernames_container" data-usernames="${i}">
        <p class="usernames_explanation">There are ${
          goal?.usernames?.length
        } users in this room </p>
        <span class="usernames"> ${goal?.usernames?.join(", ")} </span>
        </div>
        <button class="btn--usernames hidden" data-btn-usernames="${i}">users</button>
        `;

        return `
        <div class="card" data-card="${i}">
            ${roomIdUsernames}
            
            <div class="title--outer">
            <h2>${goal?.title ? goal.title : "No title is set!"}</h2>
            </div>
      
            <div class="btns--edit_delete btns_edit_delete--days_counter">
            <button class="btn--edit" data-edit="${i}">Edit</button>
            <button class="btn--delete" data-delete="${i}">Delete</button>
            </div>
            <div class="bottom_content  bottom_content--days_counter">
            <div class="remaining_days--outer">
            <div class="remaining_days">${
              remainingDaysPrev || remainingDaysPrev === 0
                ? remainingDaysPrev
                : "  "
            }</div>
            </div>
            <p>days</p>
            <div class="details--outer">
            <div class="details details--card">
                <span>${
                  remainingDaysPrev || remainingDaysPrev === 0
                    ? `${remainingDaysPrev} days are ${(
                        remainingDaysPrev / 7
                      ).toFixed(1)} weeks`
                    : ""
                }</span>
                <span>${
                  remainingDaysPrev || remainingDaysPrev === 0
                    ? `${remainingDaysPrev} days are ${(
                        remainingDaysPrev /
                        (365 / 12)
                      ).toFixed(1)} months`
                    : "No date is set!"
                }</span>
                <spam>${
                  remainingDaysPrev || remainingDaysPrev === 0
                    ? `${remainingDaysPrev} days are ${(
                        remainingDaysPrev / 365
                      ).toFixed(1)} years`
                    : ""
                }</spam>
            </div>
            </div>
          </div>
          <div class="to_do_lists to_do_lists--days_counter  hidden" contenteditable="true">
            <div class="checkbox_container">
            <input type="checkbox" id="checkbox0">
            Let's add To-Do lists here!
            </div>
          </div>
          <div class="comments comments--days_counter hidden" contenteditable="true">
            Let's add comments here!
          </div>
          </div>
       `;
      })
      .join("");

    return markup;
  }

  _setDaysCounterStyle(length) {
    this._parentElement.style.display = length ? "grid" : "block";
    this._parentElement.style.gridTemplateColumns = length
      ? "repeat(2, 1fr)"
      : "none";
  }

  //after render
  //attach eventListener for user first time set goal or room
  init(curUser) {
    if (curUser) this._data = curUser;

    this._handleHidden();

    contenteditableView._init(this.type, "daysCounter", this._data);

    contenteditableView._toDoListsContainers =
      this._parentElement.querySelectorAll(".to_do_lists");

    contenteditableView._commentsContainers =
      this._parentElement.querySelectorAll(".comments");

    contenteditableView._renderContenteditable();

    if (this._eventAttached) return;
    contenteditableView._addEventCheckbox();
    this._addEventModifiedInside();

    this._eventAttached = true;
  }
}

export default new MainDaysCounterContainerView();
