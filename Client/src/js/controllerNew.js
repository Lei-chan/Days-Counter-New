import "core-js/stable";
import "regenerator-runtime/runtime";
import UserManageApi from "./models/UserModel.js";
import helpers from "./helpers.js";
import entireAppView from "./views/entireAppView";
import loginFormView from "./views/loginFormView.js";
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
setCurUserAndInitDev();

export const setCurUserToNull = function () {
  curUser = null;
};

const controlSaveUserData = function () {
  try {
    UserManageApi._saveUserData();
    // setCurUserToNull();
  } catch (err) {
    console.error(
      "Server error! Something went wrong 🙇‍♂️ User updated data wasn't saved properly.",
      err.message
    );
  }
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
  overlayAppExplanationAboutThisWebView._addEvents();
};

const controlHowToUse = function () {
  helpers._resetSetTimeoutLogout();
  overlayAppExplanationHowToUseView.open();
  overlayAppExplanationHowToUseView._addEvents();
};

const controlLogin = async function (username, password) {
  try {
    overlayMessageSpinnerView._asyncInit("spinner");
    await UserManageApi.login(username, password);
    curUser = UserManageApi._curUser;

    loginFormView._resetLogingForm();
    loginWholeView.close();

    pageMainInit("goals");

    mainWholeView.open();
    overlayMessageSpinnerView.close();

    helpers._setTimeoutLogout();
  } catch (err) {
    overlayMessageSpinnerView.close();
    if (err.statusCode === 404)
      return loginFormView.renderError(loginFormView._errorMessageWrong);

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

const controlForgotPasswordOpen = function () {
  loginWholeView.close();
  loginForgotPasswordView.openSlow();
};

const controlForgotPasswordClose = function () {
  loginForgotPasswordView.closeSlow();
  loginWholeView.open();
};

const controlForgotPasswordSubmit = function (emailInput) {
  console.log("email input sent", emailInput);
};

const controlScroll = function () {
  loginBottomHalfView.open();
  loginBottomHalfView.renderInit();
};

const controlCreateAcc = async function (username, password, email) {
  try {
    overlayMessageSpinnerView._asyncInit("spinner");

    await UserManageApi.createUser({
      username,
      password,
      email,
    });

    curUser = UserManageApi._curUser;

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

    await UserManageApi.logout();

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

    await UserManageApi.editGoalRoom(goalRoomIndex, editedGoalRoomInfo, type);

    curUser = UserManageApi._curUser;

    pageMainInit(type);

    overlaySliderView.init(curUser);

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      `${type.at(0).toUpperCase() + type.slice(1, 4)} updated successfully!`
    );
  } catch (err) {
    helpers._resetSetTimeoutLogout();
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
      UserManageApi._removeSelected(selectedGoal);

    type === "goals"
      ? await UserManageApi.deleteGoal(deleteGoalRoomIndex)
      : await UserManageApi.deleteRoom(deleteGoalRoomIndex);

    curUser = UserManageApi._curUser;

    if (daysCounterOrSlide === "daysCounter") pageMainInit(type);

    if (daysCounterOrSlide === "slide") overlaySliderView.init(curUser);

    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      `${type.at(0).toUpperCase() + type.slice(1, 4)} deleted successfully!`
    );
  } catch (err) {
    helpers._resetSetTimeoutLogout();

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

  UserManageApi.saveToDoListsComments(
    type,
    modifiedCard,
    toDoLists,
    checkedOrNotArr,
    comments
  );

  curUser = UserManageApi._curUser;
};

const controlDaysCounter = function (type) {
  helpers._resetSetTimeoutLogout();

  UserManageApi._updateForDaysCounter(type);

  curUser = UserManageApi._curUser;

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

  // mainDaysCounterContainerView._data = curUser;
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

// const controlRoomsSaveSelected = function (selectedGoalsIndex) {
//   // try {
//   helpers._resetSetTimeoutLogout();

//   // overlayMessageSpinnerView._asyncInit("spinner");

//   UserManageApi._saveSelectedGoals(selectedGoalsIndex);

//   curUser = UserManageApi._curUser;
//   console.log(curUser);
//   // } catch (err) {
//   //   helpers._resetSetTimeoutLogout();

//   //   console.error(err);

//   //   overlayMessageSpinnerView._asyncInit(
//   //     "message",
//   //     "error",
//   //     `Server error while creating room${
//   //       goalsOrRoomsInfo.length >= 2 ? "s" : ""
//   //     } 🙇‍♂️ <br> Please try again this later!`
//   //   );
//   // }
// };

const controlGoalsRoomsSubmit = async function (
  goalsOrRoomsInfo,
  type,
  roomType = null,
  selectedGoalsIndex = null
) {
  try {
    helpers._resetSetTimeoutLogout();
    overlayMessageSpinnerView._asyncInit("spinner");

    if (selectedGoalsIndex)
      UserManageApi._saveSelectedGoals(selectedGoalsIndex);

    type === "goals"
      ? await UserManageApi.saveGoalsInfo(goalsOrRoomsInfo)
      : await UserManageApi.saveRoomsInfo(goalsOrRoomsInfo, roomType);

    curUser = UserManageApi._curUser;
    console.log(curUser);

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
    helpers._resetSetTimeoutLogout();

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

    await UserManageApi._updatePassword(curPassword, newPassword);

    settingsView.renderInit(curUser);
    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      settingsView._message
    );
  } catch (err) {
    helpers._resetSetTimeoutLogout();

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
      overlayMessageSpinnerView._errorMessage
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

    await UserManageApi._updateUsernameEmail(updateInput, section);
    curUser = UserManageApi._curUser;

    settingsView.renderInit(curUser);
    settingsView.renderMessage();
    await overlayMessageSpinnerView._asyncInit(
      "message",
      "message",
      settingsView._message
    );

    if (section !== "username") return;

    pageMainInit("rooms");
    // mainTopSectionView.renderToParentEle(curUser);
    // mainDaysCounterContainerView.renderToParentEle(curUser);
  } catch (err) {
    helpers._resetSetTimeoutLogout();

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

const init = function () {
  helpers._saveUserDataWhenUserLeaves(controlSaveUserData);

  entireAppView._addEventClickPasswordVisibility();

  loginWholeView._addHandlerClickAppExplanation(controlAboutThisWeb);

  loginFormView.addHandlerSubmit(controlLogin);
  loginFormView.addHandlerClickForgotPassword(controlForgotPasswordOpen);

  loginForgotPasswordView.addHandlerClickClose(controlForgotPasswordClose);
  loginForgotPasswordView.addHandlerSubmit(controlForgotPasswordSubmit);

  loginScrollView.addHandlerClick(controlScroll);

  loginBottomHalfView.addHandlerSubmit(controlCreateAcc);

  mainWholeView.addHandlerClickCounter(controlDaysCounter);
  mainWholeView._addHandlerClickHowToUse(controlHowToUse);
  mainWholeView.addHandlerClickSetting(controlSettings);

  mainTopSectionView.addHandlerClickSwitch(controlSwitch);
  mainTopSectionView.addHandlerClickGoals(controlSetGoals);
  mainTopSectionView.addHandlerClickRooms(controlCreateRooms);
  mainTopSectionView._addEventClickLogout();
  mainTopSectionView._addHandlerClickIAmSure(controlLogout);

  mainDaysCounterContainerView._addEvents();
  mainDaysCounterContainerView._addHandlerClickEdit(controlEditDaysCounter);
  mainDaysCounterContainerView._addHandlerIAmSure(controlDeleteGoalRoom);
  mainDaysCounterContainerView.addHandlerClickOutside(
    controlSaveContenteditable
  );

  overlaySliderView._addEvents();
  overlaySliderView.addHandlerClickX(controlCloseOverlay);
  overlaySliderView.addHandlerClickOutside(controlCloseOverlay);
  overlaySliderView._addHandlerClickEscapeClose(controlCloseOverlay);
  overlaySliderView._addHandlerClickFinishEditing(controlEditGoalRoom);
  overlaySliderView._addHandlerIAmSure(controlDeleteGoalRoom);
  overlaySliderView.addHandlerClickOutsideContenteditable(
    controlSaveContenteditable
  );
  overlaySliderView.addHandlerSubmit(controlGoalsRoomsSubmit);
  // overlaySliderView.addHandlerSubmit(
  //   controlGoalsRoomsSubmit,
  //   controlRoomsSaveSelected
  // );

  overlayCreateRoomsView.addHandlerClick(
    controlRoomsScratch,
    controlRoomsSelect,
    controlRoomsId
  );

  settingsView.addHandlerClickX(controlCloseSettings);
  settingsView.addEventClickChange();
  settingsView.addHandlerClickFinish(
    controlUpdatePassword,
    controlUpdateUsernameEmail
  );

  overlayMessageSpinnerView._addEvents();
};
init();
