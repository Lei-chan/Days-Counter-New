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
        { title: "ahaha", date: "07/04/2025", comments: [], doToList: [] },
      ],
      remainingDaysPrev: [25],
      remainingDaysNow: [],
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

  //Set the logged in account as the current account
  state.currentAccount = account;

  //Save the logged in date
  saveLoggedInDate();

  //Save the new remaining days
  state.currentAccount.remainingDaysNow.push(
    ...calcRemainingDays(state.currentAccount.goals)
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
    goals: [{ title: "", date: "", doToList: [], comments: [] }],
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
  saveHowManyTimesClick();

  console.log(state.currentAccount, state.accounts);
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

const saveHowManyTimesClick = function () {
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
