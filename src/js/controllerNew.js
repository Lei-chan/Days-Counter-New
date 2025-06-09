import "core-js/stable";
import "regenerator-runtime/runtime";
import entireAppView from "../views/entireAppView";
import loginFormView from "../views/loginFormView";
import loginScrollView from "../views/loginScrollView";
import loginBottomHalfView from "../views/loginBottomHalfView";
import loginWholeView from "../views/loginWholeView";
import mainWholeView from "../views/mainWholeView";
import mainTopSectionView from "../views/mainTopSectionView";
import mainDaysCounterView from "../views/mainDaysCounterView";
import overlaySetGoalsView from "../views/overlaySetGoalsView";
import overlayCreateRoomsView from "../views/overlayCreateRoomsView";
import * as model from "./model";

if (model.hot) {
  model.hot.accept();
}

// loginWholeView.close();
// mainWholeView.open();

const controlHowToUse = function () {
  console.log("HOW TO USE!");
};

const controlLogin = function (inputUsername, inputPassword) {
  const account = model.findAccount(inputUsername, inputPassword);
  if (!account)
    return loginFormView.renderError(loginFormView._errorMessageWrong);

  loginWholeView.close();
  mainTopSectionView.renderToParentEle(model.state.currentAccount);
  mainDaysCounterView.renderToParentEle(model.state.currentAccount);
  mainWholeView.open();
};

const controlScroll = function () {
  loginBottomHalfView.open();
  loginBottomHalfView.renderInit();
};

const controlCreateAcc = function (username, password) {
  model.saveUsernamePassword(username, password);
  loginWholeView.close();
  mainTopSectionView.renderToParentEle(model.state.currentAccount);
  mainWholeView.open();
};

const controlSetGoals = function () {
  overlaySetGoalsView.open();
  overlaySetGoalsView.init(model.state.currentAccount);
};

const controlCreateRooms = function () {
  overlayCreateRoomsView.open();
  overlayCreateRoomsView.renderToParentEle();
};

const controlClickX = function () {
  overlaySetGoalsView.close();
};

const controlSeatGoalsSubmit = function (goalsInfo) {
  model.saveGoalsInfo(goalsInfo);
  console.log(model.state);
  overlaySetGoalsView.init(model.state.currentAccount);
  mainDaysCounterView.renderToParentEle(model.state.currentAccount);
};

const init = function () {
  entireAppView.addHandlerClick(controlHowToUse);
  loginFormView.addHandlerSubmit(controlLogin);
  loginScrollView.addHandlerClick(controlScroll);
  loginBottomHalfView.addHandlerSubmit(controlCreateAcc);
  mainTopSectionView.addHandlerClickGoals(controlSetGoals);
  mainTopSectionView.addHandlerClickRooms(controlCreateRooms);
  overlaySetGoalsView.addHandlerClickX(controlClickX);
  overlaySetGoalsView.addEventClickRight();
  overlaySetGoalsView.addEventClickLeft();
  overlaySetGoalsView.addEventArrowKey();
  overlaySetGoalsView.addEventClickDot();
  overlaySetGoalsView.addHandlerSubmit(controlSeatGoalsSubmit);
};
init();
