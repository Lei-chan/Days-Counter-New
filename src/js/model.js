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
      remainingDays: [25],
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
  return account;
};

export const saveUsernamePassword = function (username, password) {
  const account = {
    id: nanoid(), //size is 21
    username,
    password,
    email: "",
    goals: [{ title: "", date: "", doToList: [], comments: [] }],
    remainingDays: [],
    rooms: [{ id: "", goals: [{ date: "", doToList: [], comments: [] }] }],
  };
  state.accounts.push(account);
  state.currentAccount = account;
};

export const saveGoalsInfo = function (goalsInfo) {
  //Adding the new goals info to the goals array
  state.currentAccount.goals.push(...goalsInfo);

  //Adding remaining days for each goal to the remaingDays array
  state.currentAccount.remainingDays.push(...calcRemainingDays(goalsInfo));

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
