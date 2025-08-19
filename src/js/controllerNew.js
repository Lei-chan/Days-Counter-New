import "core-js/stable";
import "regenerator-runtime/runtime";
import UserModel from "./models/UserModel.js";
import manageData from "./models/manageModel.js";
import helpers from "./helpers.js";
import entireAppView from "./views/entireAppView";
import loginTopHalfView from "./views/loginTopHalfView.js";
import loginForgotPasswordView from "./views/loginForgotPasswordView.js";
import loginScrollView from "./views/loginScrollView.js";
import loginBottomHalfView from "./views/loginBottomHalfView.js";
import loginWholeView from "./views/loginWholeView.js";
import overlayAppExplanationAboutThisWebView from "./views/overlayAppExplanationAboutThisWebView.js";
import mainWholeView from "./views/mainWholeView.js";
import mainTopSectionView from "./views/mainTopSectionView.js";
import overlaySliderView from "./views/overlaySliderView.js";
import overlayCreateRoomsView from "./views/overlayRoomsView.js";
import mainDaysCounterContainerView from "./views/mainDaysCounterContainerView.js";
import overlayAppExplanationHowToUseView from "./views/overlayAppExplanationHowToUseView.js";
import settingsView from "./views/settingsView.js";
import contenteditableView from "./views/contenteditableView.js";
import overlayView from "./views/overlayView.js";
import overlayMessageSpinnerView from "./views/overlayMessageSpinnerView.js";

let curUser;

///For dev
/**
 * Go to the main page by using the default curUser info
 */
const setCurUserAndInitDev = function () {
  curUser = {
    username: "leichan!",
    email: "jjjjjjjjjjjjjjjjjjj@jjjjjjjj.gmail.com",
    goals: [
      {
        title: "Springringringringringkkkkkkkkkkkkk",
        date: "04/30/2026",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
      {
        title: "Spring",
        date: "04/30/2026",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
      {
        title: "Spring",
        date: "04/30/2026",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
      {
        title: "Spring",
        date: "04/30/2026",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
      {
        title: "Spring",
        date: "04/30/2026",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
    ],
    remainingDaysPrev: [3650],
    remainingDaysNow: [300],
    howManyTimesClick: [65],
    rooms: [
      {
        roomId: "hkskjjkdjksjkskkHHJI9",
        usernames: ["leichan", "haha"],
        title: "Summer",
        date: "08/21/2025",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
      {
        roomId: "ABCDEFGHIJKLMNOPQRSTU",
        usernames: ["leichan", "haha"],
        title: "Summer",
        date: "08/21/2025",
        comments: "",
        toDoLists: "",
        toDoListsCheckbox: [],
      },
    ],
    remainingDaysPrevRooms: [22],
    remainingDaysNowRooms: [20],
    howManyTimesClickRooms: [2],
  };

  mainTopSectionView.type =
    mainDaysCounterContainerView.type =
    mainWholeView.type =
      "goals";

  mainTopSectionView.renderToParentEle(curUser);
  mainTopSectionView._changeSwitch();
  mainDaysCounterContainerView.renderToParentEle(curUser);
  mainDaysCounterContainerView.init();
  mainWholeView.init(curUser);
  loginWholeView.close();
  mainWholeView.open();
  console.log("Dev");
};
// setCurUserAndInitDev();

export const setCurUserToNull = function () {
  curUser = null;
};

const controlSaveUserData = function () {
  try {
    UserModel._saveUserData();
  } catch (err) {
    console.error(
      "Server error! Something went wrong 🙇‍♂️ User updated data wasn't saved properly.",
      err.message
    );
  }
};

const initLogin = function () {
  loginTopHalfView.renderInit(manageData);
};

const pageMainInit = function (type) {
  mainTopSectionView.type =
    mainDaysCounterContainerView.type =
    mainWholeView.type =
      type;

  mainTopSectionView.renderToParentEle(curUser);
  mainTopSectionView._changeSwitch();
  mainDaysCounterContainerView.renderToParentEle(curUser);
  mainDaysCounterContainerView.init();
  mainWholeView.init(curUser);
};

const controlAboutThisWeb = function () {
  overlayAppExplanationAboutThisWebView.open();
};

const controlHowToUse = function () {
  helpers._resetSetTimeoutLogout();
  overlayAppExplanationHowToUseView.open();
};

const controlLogin = async function (username, password) {
  try {
    overlayMessageSpinnerView._asyncInit("spinner");
    await UserModel.login(username, password);
    curUser = UserModel._curUser;

    loginTopHalfView._resetLogingForm();
    loginWholeView.close();

    pageMainInit("goals");

    mainWholeView.open();
    overlayMessageSpinnerView.close();

    helpers._setTimeoutLogout();
  } catch (err) {
    overlayMessageSpinnerView.close();
    if (err.statusCode === 404)
      return loginTopHalfView.renderError(loginTopHalfView._errorMessageWrong);

    if (err.statusCode === 429)
      return overlayMessageSpinnerView._asyncInit(
        "message",
        "error",
        err.message
      );

    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      overlayMessageSpinnerView._errorMessage
    );
  }
};

///soon!
// const controlForgotPasswordOpen = function () {
//   loginWholeView.close();
//   loginForgotPasswordView.openSlow();
// };

// const controlForgotPasswordClose = function () {
//   loginForgotPasswordView.closeSlow();
//   loginWholeView.open();
// };

// const controlForgotPasswordSubmit = function (emailInput) {
//   console.log("email input sent", emailInput);
// };

const controlScroll = function () {
  loginBottomHalfView.open();
  loginBottomHalfView.renderInit();
};

const controlCreateAcc = async function (username, password, email) {
  try {
    overlayMessageSpinnerView._asyncInit("spinner");

    await UserModel.createUser({
      username,
      password,
      email,
    });

    curUser = UserModel._curUser;

    mainTopSectionView.type =
      mainDaysCounterContainerView.type =
      mainWholeView.type =
        "goals";
    mainTopSectionView.renderToParentEle(curUser);
    mainDaysCounterContainerView.renderToParentEle(curUser);
    mainWholeView.init(curUser);
    loginWholeView.close();

    mainWholeView.open();

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      overlayMessageSpinnerView._messageCreateAcc
    );

    helpers._setTimeoutLogout();
  } catch (err) {
    overlayMessageSpinnerView.close();
    if (
      err.name === "ValidationError" ||
      err.name === "ExpressValidatorError" ||
      err.name === "DuplicateUserInfo"
    )
      return loginBottomHalfView.renderError(err.message);

    if (err.statusCode === 429)
      return overlayMessageSpinnerView._asyncInit(
        "message",
        "error",
        err.message
      );

    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      overlayMessageSpinnerView._errorMessage
    );
  }
};

const controlSwitch = function (type) {
  helpers._resetSetTimeoutLogout();
  pageMainInit(type);
};

const controlLogout = async function () {
  try {
    helpers._resetSetTimeoutLogout();

    await UserModel.logout();

    setCurUserToNull();

    settingsView.close();
    overlayView.close();
    mainWholeView.close();

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      overlayMessageSpinnerView._messageLogout
    );

    loginWholeView.open();
  } catch (err) {
    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      overlayMessageSpinnerView._errorMessageLogout
    );
  }
};

const controlEditDaysCounter = function (editGoalRoomIndex, type) {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.type = type;
  if (type === "rooms") overlaySliderView.roomType = "create";

  overlaySliderView.init(curUser, editGoalRoomIndex);
  overlaySliderView._changeGoalRoomForEdit(editGoalRoomIndex);

  overlaySliderView.open();
};

const controlEditGoalRoom = async function (
  goalRoomIndex,
  editedGoalRoomInfo,
  type
) {
  try {
    helpers._resetSetTimeoutLogout();

    overlayMessageSpinnerView._asyncInit("spinner");

    await UserModel.editGoalRoom(goalRoomIndex, editedGoalRoomInfo, type);

    curUser = UserModel._curUser;

    pageMainInit(type);

    overlaySliderView.init(curUser);

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      `${type.at(0).toUpperCase() + type.slice(1, 4)} updated successfully!`
    );
  } catch (err) {
    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      overlayMessageSpinnerView._errorMessage
    );
  }
};

const controlDeleteGoalRoom = async function (
  deleteGoalRoomIndex,
  type,
  selectedGoal = null,
  daysCounterOrSlide
) {
  try {
    helpers._resetSetTimeoutLogout();

    overlayMessageSpinnerView._asyncInit("spinner");

    //remove selected from selected goal
    if (type === "rooms" && selectedGoal)
      UserModel._removeSelected(selectedGoal);

    type === "goals"
      ? await UserModel.deleteGoal(deleteGoalRoomIndex)
      : await UserModel.deleteRoom(deleteGoalRoomIndex);

    curUser = UserModel._curUser;

    if (daysCounterOrSlide === "daysCounter") pageMainInit(type);

    if (daysCounterOrSlide === "slide") overlaySliderView.init(curUser);

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      `${type.at(0).toUpperCase() + type.slice(1, 4)} deleted successfully!`
    );
  } catch (err) {
    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      overlayMessageSpinnerView._errorMessage
    );
  }
};

const controlSaveContenteditable = function (
  type,
  modifiedCard,
  toDoLists = null,
  checkedOrNotArr = null,
  comments = null
) {
  helpers._resetSetTimeoutLogout();

  UserModel.saveToDoListsComments(
    type,
    modifiedCard,
    toDoLists,
    checkedOrNotArr,
    comments
  );

  curUser = UserModel._curUser;
};

const controlDaysCounter = function (type) {
  helpers._resetSetTimeoutLogout();

  UserModel._updateForDaysCounter(type);

  curUser = UserModel._curUser;

  mainTopSectionView.renderToParentEle(curUser);
  mainDaysCounterContainerView.renderToParentEle(curUser);
  mainDaysCounterContainerView._handleHidden();
  mainWholeView.init(curUser);
};

/////////////Goals/Rooms/////////////////
const controlSetGoals = function () {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.type = "goals";
  overlaySliderView.init(curUser);
  overlaySliderView.open();
};

const controlCreateRooms = function () {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.type = "rooms";
  overlayCreateRoomsView.renderToParentEle();
  overlayCreateRoomsView.open();
};

const controlCloseOverlay = function () {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.close();

  mainDaysCounterContainerView.init(curUser);
  contenteditableView._resetAllToFirst(
    mainDaysCounterContainerView._parentElement
  );
};

const controlRoomsScratch = function () {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.roomType = "create";
  overlaySliderView.init(curUser);
  overlaySliderView.open();
};

const controlRoomsSelect = function () {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.roomType = "select";
  overlaySliderView.init(curUser);
  overlaySliderView.open();
};

const controlRoomsId = function () {
  helpers._resetSetTimeoutLogout();

  overlaySliderView.roomType = "id";
  overlaySliderView.init(curUser);
  overlaySliderView.open();
};

const controlGoalsRoomsSubmit = async function (
  goalsOrRoomsInfo,
  type,
  roomType = null,
  selectedGoalsIndex = null
) {
  try {
    helpers._resetSetTimeoutLogout();
    overlayMessageSpinnerView._asyncInit("spinner");

    if (selectedGoalsIndex) UserModel._saveSelectedGoals(selectedGoalsIndex);

    type === "goals"
      ? await UserModel.saveGoalsInfo(goalsOrRoomsInfo)
      : await UserModel.saveRoomsInfo(goalsOrRoomsInfo, roomType);

    curUser = UserModel._curUser;

    pageMainInit(type);

    overlaySliderView.type = type;
    if (roomType) overlaySliderView.roomType = roomType;

    overlaySliderView.init(curUser);

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      `${type.at(0).toUpperCase()}${
        goalsOrRoomsInfo.length >= 2 ? type.slice(1) : type.slice(1, 4)
      } created successfully!`
    );
  } catch (err) {
    if (err.statusCode === 404)
      return overlayMessageSpinnerView._asyncInit(
        "message",
        "error",
        overlayMessageSpinnerView._errorMessageRoomNotFound
      );

    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      `Server error while creating ${
        goalsOrRoomsInfo.length >= 2 ? type : type.slice(0, 4)
      } 🙇‍♂️ <br> Please try again this later!`
    );
  }
};

//////////////Settings////////////////
const controlSettings = function () {
  helpers._resetSetTimeoutLogout();

  mainWholeView.close();
  settingsView.renderInit(curUser);
  settingsView.open();
};

const controlCloseSettings = function () {
  helpers._resetSetTimeoutLogout();

  settingsView.close();
  mainWholeView.open();
};

const controlUpdatePassword = async function (
  curPassword,
  newPassword,
  curPasswordInputField,
  newPasswordInputField
) {
  try {
    helpers._resetSetTimeoutLogout();

    overlayMessageSpinnerView._asyncInit("spinner");

    await UserModel._updatePassword(curPassword, newPassword);

    settingsView.renderInit(curUser);
    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      settingsView._message
    );
  } catch (err) {
    if (
      err.name === "ValidationError" ||
      err.name === "ExpressValidatorError"
    ) {
      overlayMessageSpinnerView.close();
      settingsView.renderError(err.message);
      settingsView.renderErrorInputField(curPasswordInputField);
      return settingsView.renderErrorInputField(newPasswordInputField);
    }

    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      err.name === "validationFailed"
        ? `${err.message}!<br>Please try again :)`
        : overlayMessageSpinnerView._errorMessage
    );
  }
};

//section is username or email
const controlUpdateUsernameEmail = async function (
  updateInput,
  section,
  inputField
) {
  try {
    helpers._resetSetTimeoutLogout();

    overlayMessageSpinnerView._asyncInit("spinner");

    await UserModel._updateUsernameEmail(updateInput, section);
    curUser = UserModel._curUser;

    settingsView.renderInit(curUser);
    settingsView.renderMessage();
    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      settingsView._message
    );

    if (section !== "username") return;

    pageMainInit("rooms");
  } catch (err) {
    if (
      err.name === "ValidationError" ||
      err.name === "ExpressValidatorError" ||
      err.name === "DuplicateUserInfo"
    ) {
      overlayMessageSpinnerView.close();
      settingsView.renderError(err.message);
      return settingsView.renderErrorInputField(inputField);
    }

    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      overlayMessageSpinnerView._errorMessage
    );
  }
};

const controlCloseAccount = async function (passwordInput) {
  try {
    helpers._resetSetTimeoutLogout();

    overlayMessageSpinnerView._asyncInit("spinner");

    await UserModel.closeAccount(passwordInput);

    setCurUserToNull();

    settingsView.close();
    mainWholeView.close();

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      overlayMessageSpinnerView._messageCloseAccount
    );

    loginWholeView.open();
  } catch (err) {
    console.error(err);
    overlayMessageSpinnerView._asyncInit(
      "message",
      "error",
      err.name === "validationFailed"
        ? `${err.message}!<br>Please try again :)`
        : overlayMessageSpinnerView._errorMessage
    );
  }
};

const init = function () {
  /// Add event for saving user data when user leaves the site
  helpers.saveUserDataWhenUserLeaves(controlSaveUserData);

  /// render news lists
  initLogin();

  /// loginWhole
  loginWholeView.addHandlerClickAppExplanation(controlAboutThisWeb);

  /// loginTopHalf
  loginTopHalfView.addHandlerSubmit(controlLogin);
  // loginTopHalfView.addHandlerClickForgotPassword(controlForgotPasswordOpen);

  ///loginForgotPassword later!!
  // loginForgotPasswordView.addHandlerClickClose(controlForgotPasswordClose);
  // loginForgotPasswordView.addHandlerSubmit(controlForgotPasswordSubmit);

  /// loginScroll
  loginScrollView.addHandlerClick(controlScroll);

  /// loginBottomHalf
  loginBottomHalfView.addHandlerSubmit(controlCreateAcc);

  /// mainWhole
  mainWholeView.addHandlerClickCounter(controlDaysCounter);
  mainWholeView._addHandlerClickHowToUse(controlHowToUse);
  mainWholeView.addHandlerClickSetting(controlSettings);

  /// mainTopSection
  mainTopSectionView.addHandlerClickSwitch(controlSwitch);
  mainTopSectionView.addHandlerClickGoals(controlSetGoals);
  mainTopSectionView.addHandlerClickRooms(controlCreateRooms);
  mainTopSectionView.addHandlerClickIAmSure(controlLogout);

  /// mainDaysCounterContainer
  mainDaysCounterContainerView.addHandlerClickEdit(controlEditDaysCounter);
  mainDaysCounterContainerView.addHandlerIAmSure(controlDeleteGoalRoom);
  mainDaysCounterContainerView.addHandlerClickOutside(
    controlSaveContenteditable
  );

  /// overlaySliderView
  overlaySliderView.addHandlerClickX(controlCloseOverlay);
  overlaySliderView.addHandlerClickOutside(controlCloseOverlay);
  overlaySliderView.addHandlerClickEscapeClose(controlCloseOverlay);
  overlaySliderView.addHandlerClickFinishEditing(controlEditGoalRoom);
  overlaySliderView.addHandlerIAmSure(controlDeleteGoalRoom);
  overlaySliderView.addHandlerClickOutsideContenteditable(
    controlSaveContenteditable
  );
  overlaySliderView.addHandlerSubmit(controlGoalsRoomsSubmit);

  /// overlayCreateRooms
  overlayCreateRoomsView.addHandlerClick(
    controlRoomsScratch,
    controlRoomsSelect,
    controlRoomsId
  );

  /// settings
  settingsView.addHandlerClickX(controlCloseSettings);
  settingsView.addHandlerClickFinish(
    controlUpdatePassword,
    controlUpdateUsernameEmail
  );
  settingsView.addHandlerClickIAmSure(controlCloseAccount);
};
init();
