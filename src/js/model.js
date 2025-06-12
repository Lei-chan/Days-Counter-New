//////Create unique ID/////
import { nanoid } from "nanoid";

export const state = {
  accounts: [
    {
      id: "hkshdjs63s8****u23h3j",
      username: "Lei chan",
      password: "abc123!@#",
      email: "",
      goals: [
        { title: "ahaha", date: "07/05/2025", comments: [], doToList: [] },
      ],
      remainingDaysPrev: [25],
      remainingDaysNow: ["?"],
      howManyTimesClick: [],
      loggedInDates: [],
      rooms: [
        // { id: "", goals: [] }
      ],
    },
  ],
  currentAccount: {}, //account
};

export const findAccount = function (username, password) {
  const account = state.accounts.find(
    (acc) => acc.username === username && acc.password === password
  );

  if (!account) return;

  state.currentAccount = account;

  //Save the logged in date
  saveLoggedInDate();

  //Set the new remaining days
  state.currentAccount.remainingDaysNow = calcRemainingDays(
    state.currentAccount.goals
  );
  saveHowManyTimesClick();

  console.log(state.currentAccount);

  return account;
};

export const saveUsernamePassword = function (username, password) {
  const account = {
    id: nanoid(), //size is 21
    username,
    password,
    email: "",
    goals: [],
    remainingDaysPrev: [],
    remainingDaysNow: [],
    howManyTimesClick: [],
    loggedInDates: [],
    rooms: [{ id: "", goals: [{ date: "", doToList: [], comments: [] }] }],
  };

  //Save the new account
  state.accounts.push(account);

  //Set the account as the current account
  state.currentAccount = account;

  //Save the logged in date
  saveLoggedInDate();
  console.log(state.currentAccount);
};

const saveLoggedInDate = function () {
  state.currentAccount.loggedInDates.push(
    new Intl.DateTimeFormat("en-US").format(new Date())
  );
};

export const saveGoalsInfo = function (goalsInfo) {
  //Saving the new goals info to the goals array
  state.currentAccount.goals.push(...goalsInfo);

  //Saving remaining days for each new goal
  state.currentAccount.remainingDaysPrev.push(...calcRemainingDays(goalsInfo));
  state.currentAccount.remainingDaysNow.push(...calcRemainingDays(goalsInfo));

  changeOrders();
  saveHowManyTimesClick();
};

const changeOrderRemainingDays = function (originalGoals, sortedGoals) {
  //Create empty arrays with the same length of remainingDays arrays
  let sortedRemainingDaysPrev = new Array(
    state.currentAccount.remainingDaysPrev.length
  );
  let sortedRemainingDaysNow = new Array(
    state.currentAccount.remainingDaysNow.length
  );

  originalGoals.forEach((originalGoal, i) => {
    //Goal index in the original goals array is i
    //Goal index in the current goals array is ...↓
    const curIndex = sortedGoals.findIndex(
      (sortedGoal) => sortedGoal === originalGoal
    );

    //Putting remaining days for the goal to the goal index place in the current goals array
    sortedRemainingDaysPrev.fill(
      state.currentAccount.remainingDaysPrev[i],
      curIndex,
      curIndex + 1
    );
    sortedRemainingDaysNow.fill(
      state.currentAccount.remainingDaysNow[i],
      curIndex,
      curIndex + 1
    );
  });

  return [sortedRemainingDaysPrev, sortedRemainingDaysNow];
};

const changeOrderGoals = function (goals) {
  //Create array with undefined goal dates
  const undefinedDates = goals.filter((goal) => !goal.date);

  //Sort goals in chronological order
  const sortedGoalsShort = goals
    .filter((goal) => goal.date)
    .toSorted((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);

      const dateAFormatted =
        dateA.getFullYear() +
        `${dateA.getMonth()}`.padStart(2, 0) +
        `${dateA.getDate()}`.padStart(2, 0);

      const dateBFormatted =
        dateB.getFullYear() +
        `${dateB.getMonth()}`.padStart(2, 0) +
        `${dateB.getDate()}`.padStart(2, 0);

      return dateAFormatted - dateBFormatted;
    });

  //Put undefined dates at the end of sorted goals
  const sortedGoals = [...sortedGoalsShort, ...undefinedDates];
  return sortedGoals;
};

const changeOrders = function () {
  const goals = state.currentAccount.goals;

  const sortedGoals = changeOrderGoals(goals);

  const [sortedRemainingDaysPrev, sortedRemainingDaysNow] =
    changeOrderRemainingDays(goals, sortedGoals);

  //Set sorted goals and sorted remainingDays
  state.currentAccount.goals = sortedGoals;
  state.currentAccount.remainingDaysPrev = sortedRemainingDaysPrev;
  state.currentAccount.remainingDaysNow = sortedRemainingDaysNow;
};

const calcRemainingDays = function (goalsInfo) {
  //Create a new array of remaining days for each goal
  const remainingDays = goalsInfo.map((goal) =>
    goal.date !== ""
      ? Math.ceil((new Date(goal.date) - new Date()) / (1000 * 60 * 60 * 24))
      : undefined
  );

  return remainingDays;
};

export const saveHowManyTimesClick = function () {
  const remainingDaysPrev = state.currentAccount.remainingDaysPrev;
  const remainingDaysNow = state.currentAccount.remainingDaysNow;

  const howManyTimesClickNew = remainingDaysPrev.map((daysPrev, i) => {
    const daysNow = remainingDaysNow[i];
    //1) User can not click for the goal
    if (daysPrev === daysNow) return 0;
    //2) User can click for the goal
    return daysPrev - daysNow;
  });

  state.currentAccount.howManyTimesClick = howManyTimesClickNew;
};

export const updateRemainingDaysPrev = function () {
  const remainingDaysNow = state.currentAccount.remainingDaysNow;

  const updatedRemainingDaysPrev = state.currentAccount.remainingDaysPrev.map(
    (daysPrev, i) => {
      const daysNow = remainingDaysNow[i];

      //1) User can still click for the goal
      console.log(daysPrev, daysNow);
      if (daysPrev !== daysNow) return --daysPrev;

      //2) User can nont click anymore
      if (daysPrev === daysNow) return daysPrev;
    }
  );

  state.currentAccount.remainingDaysPrev = updatedRemainingDaysPrev;
};
