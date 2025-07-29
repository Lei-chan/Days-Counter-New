import View from "./View.js";

class OverlayMessageSpinnerView extends View {
  _parentElement = document.querySelector(".overlay--message_spinner");
  _messageSpinnerType; //message or spinner
  _messageType; //'question', 'message' or 'errorMessage';
  _lastClickedForIAmSure; // 'delete', 'logout', or 'closeAccount'
  _message;
  _questionLogout = "Are you sure you want to log out?";
  _questionCloseAccount =
    "Are you sure you want to close your account?<br>(⚠️ Once you close your account, you can not recover it!)";
  _messageCreateAcc =
    "Welcome to Days counter 😁 <br>Your account created successfully!";
  _messageLogout =
    "Logged out successfully!<br>See you again soon 😊<br>Have a wonderful day!";
  _messageSessionTimeout =
    "Session Timeout!<br>There were no actions for while.<br>Redirecting to the login page...";
  _errorMessageUnableToCopy =
    "Something went wrong 🙇‍♂️<br>Unabled to copy the room ID!<br>Please manually copy it";
  _errorMessageInvalidId = "Please enter valid Room IDs!";
  _errorMessageRoomAlreadyExists =
    "Please enter Room IDs for rooms you haven't joined yet!";
  _errorMessageRoomNotFound =
    "Room ID that doesn't exist was entered! Please enter valid IDs";
  _errorMessageLogout =
    "Server error 🙇‍♂️<br>Please try this again later<br>(You will still be automatically logged out in 30 minutes)";
  _errorMessage = "Server error 🙇‍♂️ <br>Please try this again later";

  _addEvents() {
    this._addEventClickX();
    this._addEventClickOk();
  }

  _addEventClickX() {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const btn = e.target.closest(".btn_x--message");
      if (!btn) return;

      this.close();
    });
  }

  _addEventClickOk() {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--ok");
      if (!btn) return;

      this.close();
    });
  }

  _addHandlerClickIAmSure(
    handlerDelete = null,
    handlerLogout = null,
    handlerCloseAccount = null
  ) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--i_am_sure");
      if (!btn) return;

      if (handlerDelete) return handlerDelete();

      if (handlerLogout) return handlerLogout();

      handlerCloseAccount();
    });
  }

  _generateMarkup() {
    if (this._messageSpinnerType === "spinner")
      return `<div class="spinner"></div>`;

    let header;
    let button;
    if (this._messageType === "question") {
      header = "Are you sure?";
      button = `<button class='btn--bottom btn--i_am_sure'>I'm sure</button>`;
    }
    if (this._messageType === "message") {
      header = "Success!";
      button = "";
    }
    if (this._messageType === "error") {
      header = "Error!";
      button = "<button class='btn--bottom btn--ok'>OK</button>";
    }

    return `
    <div class="message_container message_container--${
      this._messageType === "question" ? "" : this._messageType
    }">
    <button class="btn--x btn_x--message">&times;</button>
    <h3 class="message_header message_header--${
      this._messageType === "question" ? "" : this._messageType
    }">
      ${header}</h3>
    <p>${this._message}</p>
    ${button}
    </div>
    `;
  }

  //async only when messageType is 'message'
  async _asyncInit(
    messageSpinnnerType = "spinner",
    messageType = "question",
    message,
    lastClickedForIAmSure = null
  ) {
    try {
      this._messageSpinnerType = messageSpinnnerType;
      this._messageType = messageType;
      this._message = message;

      if (messageType === "question")
        this._lastClickedForIAmSure = lastClickedForIAmSure;

      this.renderToParentEle();

      // if (
      //   message === this._errorMessageLogout ||
      //   this._errorMessageUnableToCopy
      // )
      //   this._parentElement.querySelector(
      //     ".message_container"
      //   ).style.aspectRatio = "1 / 0.57";

      this.open();

      if (messageType !== "message") return;

      await this._setTimeout();
      this.close();
    } catch (err) {
      throw err;
    }
  }
}

export default new OverlayMessageSpinnerView();
