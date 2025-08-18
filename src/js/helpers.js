import { LOGOUNT_TIMEOUT } from "./config.js";
import { setCurUserToNull } from "./controllerNew.js";
import UserManageApi from "../js/models/UserModel.js";
import overlayMessageSpinnerView from "../js/views/overlayMessageSpinnerView.js";
import overlayView from "../js/views/overlayView.js";
import mainWholeView from "../js/views/mainWholeView.js";
import settingsView from "../js/views/settingsView.js";
import loginWholeView from "../js/views/loginWholeView.js";

class Helpers {
  _setTimeoutId;

  _resetSetTimeoutLogout(minutes = LOGOUNT_TIMEOUT) {
    if (!this._setTimeoutId) return;

    clearTimeout(this._setTimeoutId);

    this._setTimeoutLogout(minutes);
  }

  ////I guess I should add some function to get rid of old refreshToken (database) that couldn't be deleted when user logs in next time
  _setTimeoutLogout(minutes = LOGOUNT_TIMEOUT) {
    this._setTimeoutId = setTimeout(async () => {
      try {
        await overlayMessageSpinnerView._asyncInit(
          "message",
          "message",
          overlayMessageSpinnerView._messageSessionTimeout
        );

        await UserManageApi.logout();

        setCurUserToNull();

        settingsView.close();
        overlayView.close();
        mainWholeView.close();
        loginWholeView.open();

        this._setTimeoutId = null;
      } catch (err) {
        console.error(err);
        overlayMessageSpinnerView._asyncInit(
          "message",
          "error",
          "Server error 🙇‍♂️ This screen will go to the login page automatically. "
        );

        UserManageApi._removeCurUserInfo();

        setCurUserToNull();

        settingsView.close();
        overlayView.close();
        mainWholeView.close();
        loginWholeView.open();

        this._setTimeoutId = null;
      }
    }, minutes * 60 * 1000);
  }

  ///////////save contenteditable / daysCounter only in userModel _curUser => When user leaves the site, save _curUser to the database
  saveUserDataWhenUserLeaves(handler) {
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") handler();
    });
  }
}

export default new Helpers();
