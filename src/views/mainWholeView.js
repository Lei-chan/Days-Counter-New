import View from "./View";
class MainWholeView extends View {
  _parentElement = document.querySelector(".page--main");
  _renderInitContainer = document.querySelector(".btn_warning_container");
  _messageContainer;
  _data;
  _errorMessage =
    "You can not click the button anymore! <br> Wait for another day ;)";

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", (e) => {
      const btn = e.target.closest(".btn--count");
      if (!btn) return;

      this._messageContainer = document.querySelector(".warning--counter");

      //If user can not click anymore
      if (!Math.max(...this._data.howManyTimesClick)) return this.renderError();

      handler();
    });
  }

  _generateMarkup() {
    //If there are no goals
    if (!this._data.goals.length) return "";

    return `
    <button class="btn--count">Click here!</button> 
    <div class="warning--counter hidden">1</div>  
    `;
  }
}

export default new MainWholeView();
