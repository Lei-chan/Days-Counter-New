////////////first page (log in page)/////////
const pageFirst = document.getElementById("page_first");
const btnHowToUseAll = document.querySelectorAll(".btn_howtouse");
const inputusernameLogin = document.querySelector(".login--input_username");
const inputPasswordLogin = document.querySelector(".login--input_password");
const btnLogin = document.querySelector(".login--btn");
const warningLogin = document.querySelector(".login--warning");
const btnScrollCreateAcc = document.querySelector(
  ".create__account--btn_scroll"
);

//////////Create a new account///////////////
const bodyCreateAcc = document.getElementById("create__account--body");
const inputPasswordCreateAcc = document.querySelector(
  ".create__account--input_password"
);
const inputUsernameCreateAcc = document.querySelector(
  ".create__account--input_username"
);

const warningCreateAcc = document.querySelector(
  ".create__account--username_warning"
);

let sliderOneCreateAcc;
let sliderTwoCreateAcc;
document.querySelectorAll(".create__account--slider").forEach((slider) => {
  if (slider.classList.contains("one")) sliderOneCreateAcc = slider;
  if (slider.classList.contains("two")) sliderTwoCreateAcc = slider;
});

const btnRightCreateAcc = document.querySelector(".create__account--btn_right");
const btnLeftCreateAcc = document.querySelector(".create__account--btn_left");
const dotContainerCreateAcc = document.querySelector(".create__account--dots");
// const btnNextCreateAcc = document.querySelector(".create__account--btn_next");

///////////////log in////////////////////////
const usernameLogin = document.querySelector(".username--login");
const passwordLogin = document.querySelector(".password--login");

////////////////main page///////////////////
const body2 = document.getElementById("body2");
const welcome = document.querySelector(".welcome");
const timesLeft = document.querySelector(".times_left-inside");
const date = document.querySelector(".date");
const more = document.querySelector(".more");
const container = document.querySelector(".container");
const allDays = document.querySelectorAll(".days");
const warningCounter = document.querySelector(".warning_counter");

////////////first page/////////////////
class AppFirst {
  #slideAll;
  #currentSlide = 0;
  #dotAll;
  #currentFormBtn = 0;
  #accounts = [];
  constructor() {
    this._setSliderOneComponent(10);
    this._createDots();

    btnScrollCreateAcc.addEventListener(
      "click",
      this._scrollToSlide.bind(this)
    );

    // this._activeDot(this.#currentSlide);
    this._goToSlide();

    btnLeftCreateAcc.addEventListener("click", this._previousSlide.bind(this));

    btnRightCreateAcc.addEventListener("click", this._nextSlide.bind(this));
    document.addEventListener("keydown", this._arrowSlide.bind(this));

    dotContainerCreateAcc.addEventListener(
      "click",
      this._clickDotSlide.bind(this)
    );

    btnCreateAccAllArr.forEach((btn) => {
      if (btn.classList.contains(0))
        btn.addEventListener("click", this._setInfoToSetGoals.bind(this));
      if (btn.classList.contains(1))
        btn.addEventListener("click", this._setGoalsToSetToDo.bind(this));
      if (btn.classList.contains(2))
        btn.addEventListener("click", this._setToDoToMain.bind(this));
    });

    linkCreateAccAll.forEach((link) => {
      if (link.classList.contains(1)) {
        link.addEventListener("click", this._setGoalsToSetToDo.bind(this));
      }
      if (link.classList.contains(2)) {
        link.addEventListener("click", this._setToDoToMain.bind(this));
      }
    });

    btnLogin.addEventListener("click", this._verifyLogin.bind(this));
  }

  _openModel(name) {
    name.classList.remove("hidden");
  }

  _closeModel(name) {
    name.classList.add("hidden");
  }

  _setSliderOneComponent(numberOfSlides) {
    for (let i = numberOfSlides - 1; 0 <= i; i--) {
      const html = `
          <div class="create__account--slide slide--${i}">
              <h2>
                Goal No.${i + 1}
              </h2>
              <div class="create__account--goal_name">
              <p>Set the name of your goal No.${i + 1}!</p>
              <input class="create__account--input_goal_name" type="text" placeholder="goal title"></input>
              </div>
              <div class="create__account--goal_date">
              <p>Set the date of your goal No.${i + 1}!</p>
              <input class="create__account--input_goal_date" type="date"></input>
              </div>
            </div>`;
      sliderOneCreateAcc.insertAdjacentHTML("afterbegin", html);

      this.#slideAll = document.querySelectorAll(".create__account--slide");
    }
  }

  _createDots() {
    this.#slideAll.forEach((_, i) => {
      dotContainerCreateAcc.insertAdjacentHTML(
        "beforeend",
        `<button class="create__account--dots_dot" data-slide = "${i}"></button>`
      );
    });

    this.#dotAll = document.querySelectorAll(".create__account--dots_dot");
  }

  _createAccOpenClose() {
    formCreateAccAllArr.forEach((form) => {
      form.classList.add("hidden");

      if (formCreateAccAllArr.indexOf(form) !== this.#currentFormBtn) return;
      form.classList.remove("hidden");
    });
  }

  _scrollToSlide() {
    bodyCreateAcc.hidden = false;

    this._createAccOpenClose();

    const id = btnScrollCreateAcc.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }

  _activeDot() {
    this.#dotAll.forEach((dot) => {
      dot.classList.remove("create__account--dots_dot--active");
      if (Number(dot.dataset.slide) === this.#currentSlide) {
        dot.classList.add("create__account--dots_dot--active");
      }
    });
  }

  _goToSlide() {
    this.#slideAll.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${600 * (i - this.#currentSlide)}px)`)
    );
    this._activeDot();
  }

  _nextSlide(e) {
    e.preventDefault();
    this.#currentSlide =
      this.#currentSlide === this.#slideAll.length - 1
        ? 0
        : ++this.#currentSlide;
    this._goToSlide();
  }

  _previousSlide(e) {
    e.preventDefault();
    this.#currentSlide =
      this.#currentSlide === 0
        ? this.#slideAll.length - 1
        : --this.#currentSlide;
    this._goToSlide();
  }

  _arrowSlide(e) {
    if (e.key === "ArrowLeft") {
      this._previousSlide();
    }
    if (e.key === "ArrowRight") {
      this._nextSlide();
    }
  }

  _clickDotSlide(e) {
    e.preventDefault();
    if (!e.target.classList.contains("create__account--dots_dot")) return;
    this.#currentSlide = Number(e.target.dataset.slide);
    goToSlide();
  }

  _saveToAccounts(user) {
    this.#accounts.push(user);
  }

  ///////////////bug (need to separate them)//////////

  _changeFormBtn() {
    if (this.#currentFormBtn !== 2) this.#currentFormBtn++;

    this.#currentFormBtn === 0;
  }

  _setInfoToSetGoals(e) {
    e.preventDefault();

    if (inputPasswordCreateAcc.value && inputUsernameCreateAcc.value) {
      if (
        this.#accounts.find(
          (acc) =>
            acc.username === inputUsernameCreateAcc.value &&
            acc.password === inputPasswordCreateAcc.value
        )
      ) {
        warningCreateAcc.hidden = false;
      } else {
        const user = new User(
          `${inputUsernameCreateAcc.value}`,
          `${inputPasswordCreateAcc.value}`
        );
        this._saveToAccounts(user);

        this._changeFormBtn();
        this._createAccOpenClose();
      }
    }
  }

  _setGoalsToSetToDo(e) {
    e.preventDefault();
    this._changeFormBtn();
    this._createAccOpenClose();
  }

  _setToDoToMain(e) {
    e.preventDefault();
    this._changeFormBtn();
    this._goToMain();
  }

  _verifyLogin(e) {
    e.preventDefault();

    this.#accounts.forEach(function (acc) {
      if (
        usernameLogin.value === acc.username &&
        passwordLogin.value === acc.password
      ) {
        this._goToMain();
      } else {
        document.getElementById("wrong").hidden = false;
      }
    });
  }

  _goToMain() {
    pageFirst.style.display = "none";
    body2.hidden = false;
    appMain = new AppMain(this.#accounts);
  }
}

let appMain;
const appFirst = new AppFirst();

///////////main page (second page)/////////
class AppMain {
  #today = new Date();
  #accounts;
  #currentAcc;
  #howManyLeft = [];
  constructor(accounts) {
    this.#accounts === accounts;
    this._init();
    document
      .querySelector(".btn")
      .addEventListener("click", this._decreaseDays.bind(this));
    container.addEventListener("mouseover", this._daysHover.bind(0.9));
    container.addEventListener("mouseout", this._daysHover.bind(0));
  }

  _openModel(name) {
    name.classList.remove("hidden");
  }

  _closeModel(name) {
    name.classList.add("hidden");
  }

  _calcDaysPassed(date1, date2) {
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  }

  _formatDates(date) {
    date = new Date(date);
    const daysPassed = this._calcDaysPassed(this.#today, date);

    if (daysPassed === 0) return "Today";
    if (daysPassed === 1) return "Yesterday";
    if (daysPassed <= 7) return `${daysPassed} days ago`;

    return new Intl.DateTimeFormat(undefined).format(date);
  }

  _changeDaysColor() {
    document.querySelectorAll(".days").forEach((day) => {
      if (day.textContent <= 10) day.style.color = "orange";
      if (day.textContent <= 3) day.style.color = "red";
    });
  }

  _displayWelcome() {
    this.#currentAcc = this.#accounts.find(
      (acc) => acc.username === usernameLogin.value
    );

    welcome.innerHTML = "";
    welcome.insertAdjacentHTML(
      "afterbegin",
      `Welcome<br>${this.#currentAcc.username}!`
    );
  }

  _calcHowManyLeft(currentAcc) {
    this.#currentAcc.goals.forEach((goal) => {
      const goalTimeStanp = new Date(goal).getTime();
      const howManyLeft = Math.ceil(
        (goalTimeStanp - Date.now()) / 1000 / 60 / 60 / 24
      );
      this.#howManyLeft.push(howManyLeft);
    });
  }

  _displayLastVisit(currentAcc) {
    this.#currentAcc.visitDates.push(today + "");

    if (this.#currentAcc.visitDates.length > 4)
      this.#currentAcc.visitDates.splice(0, 1);

    const format =
      this.#currentAcc.visitDates.at(-2) &&
      formatDates(this.#currentAcc.visitDates.at(-2));

    date.textContent = format ? `Last Visit: ${format}` : "Your FIRST VISIT 🎊";
  }

  _displayDays(currentAcc) {
    if (this.#currentAcc.howManyDays.length === 0)
      this.#currentAcc.howManyDays = [...this.#howManyLeft];

    this.#howManyLeft.forEach((currentDay, i) => {
      const displayFirst = this.#currentAcc.howManyDays[i];

      timesLeft.textContent = displayFirst - currentDay;

      updateCardContent(i, displayFirst);
    });

    changeDaysColor();
  }

  _updateCardContent(i, displayFirst) {
    document.getElementById(`days${i}`).textContent = displayFirst;

    const firstHalf = `${displayFirst} days are`;
    const html1 = `
            <p1>${firstHalf} ${(displayFirst / 7).toFixed(1)} weeks</p1>
            <p2>${firstHalf} ${(displayFirst / 30).toFixed(1)} months</p2>
            <p3>${firstHalf} ${(displayFirst / 365).toFixed(1)} years</p3>
            `;

    const html2 = `
              <p1>${firstHalf} ${displayFirst * 24} hours</p1>
              <p2>${firstHalf} ${displayFirst * 24 * 60} minutes</p2>
              <p3>${firstHalf} ${displayFirst * 24 * 60 * 60} seconds</p3>`;

    const moreI = document.getElementById(`more${i}`);
    moreI.innerHTML = "";
    moreI.insertAdjacentHTML("afterbegin", html1);

    const additionalI = document.getElementById(`additional_${i}`);
    additionalI.innerHTML = "";
    additionalI.insertAdjacentHTML("afterbegin", html2);
  }

  _init() {
    this._displayWelcome();
    this._calcHowManyLeft();
    this._displayLastVisit();
    this._displayDays();
  }

  __decreaseDays() {
    if (+timesLeft.textContent === 0) {
      this._closeModel(warningCounter);
    } else {
      --timesLeft.textContent;

      for (let i = 0; i < this.#currentAcc.goals.length; i++) {
        let day = document.getElementById(`days${i}`).textContent;

        if (day === 0) return;

        --day;

        this.#currentAcc.howManyDays = this.#currentAcc.howManyDays.with(
          i,
          day
        );

        updateCardContent(i, day);
      }
      changeDaysColor();
    }
  }

  _daysHover = function (e) {
    if (e.target.classList.contains("days")) {
      const daysId = e.target.id;
      document.getElementById(`fukidashi_container_${daysId}`).style.opacity =
        this;
    }
  };
}

////create an account/////

class User {
  #visitDates = [];
  #howManyDays;
  #password;
  #goals;
  constructor(username, password) {
    this.username = username;
    this.#password = password;
  }

  setVisitDates() {
    this.#visitDates.push(today);
  }

  setGoals(goals) {
    //{goal name: date...}
    this.#goals = goals;
  }

  setHowManyDays() {
    this.#howManyDays = [...howManyLeft];
  }

  initLogin() {
    this.setVisitDates();
    this.setHowManyDays();
  }
}
