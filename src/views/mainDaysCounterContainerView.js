import View from "./View";

class MainDaysCounterContainerView extends View {
  _parentElement = document.querySelector(".days_counter--container");
  _data; //currentAccount
  _curAccGoalLength;

  _generateMarkup() {
    this._curAccGoalLength = this._data.goals.length;
    console.log(this._curAccGoalLength);

    if (!this._curAccGoalLength)
      return `
         <p class="start_explanation">Let's first start by setting your goals!</p>`;

    if (this._curAccGoalLength) this._setDaysCounterStyle();
    return this._data.goals
      .map((goal, i) => {
        const remainingDaysPrev = this._data.remainingDaysPrev[i];

        return `
        <div class="card" data-card="${i}">
          <div class="fukidashi_container">
            <section class="detains details--fukidashi">
            <span>${
              remainingDaysPrev
                ? `${remainingDaysPrev} days are ${(
                    remainingDaysPrev * 24
                  ).toFixed(1)} hours`
                : ""
            }</span>
            <span>${
              remainingDaysPrev
                ? `${remainingDaysPrev} days are ${(
                    remainingDaysPrev *
                    24 *
                    60
                  ).toFixed(1)} minutes`
                : "You haven't set the date <br> yet!"
            }</span>
            <span>${
              remainingDaysPrev
                ? `${remainingDaysPrev} days are ${(
                    remainingDaysPrev *
                    24 *
                    60 *
                    60
                  ).toFixed(1)} seconds`
                : ""
            }</span>
            </section>
          </div>
            <h2>${
              goal.title
                ? `Until ${goal.title}`
                : "You haven't set the title yet!"
            }</h2>
            <div class="bottom_content">
            <div class="remaining_days">${
              remainingDaysPrev ? remainingDaysPrev : "  "
            }</div>
            <p>days</p>
            <div class="details details--card">
                <span>${
                  remainingDaysPrev
                    ? `${remainingDaysPrev} days are ${(
                        remainingDaysPrev / 7
                      ).toFixed(1)} weeks`
                    : ""
                }</span>
                <span>${
                  remainingDaysPrev
                    ? `${remainingDaysPrev} days are ${(
                        remainingDaysPrev /
                        (365 / 12)
                      ).toFixed(1)} months`
                    : "You haven't set the date <br> yet!"
                }</span>
                <spam>${
                  remainingDaysPrev
                    ? `${remainingDaysPrev} days are ${(
                        remainingDaysPrev / 365
                      ).toFixed(1)} years`
                    : ""
                }</spam>
            </div>
          </div>
       </div>
       `;
      })
      .join("");
  }

  _setDaysCounterStyle() {
    this._parentElement.style.display = "grid";
    this._parentElement.style.gridTemplateColumns = "repeat(2, 1fr)";
  }
}

export default new MainDaysCounterContainerView();
