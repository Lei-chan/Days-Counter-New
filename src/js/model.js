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
        // { title: "ahaha", date: "", comments: [], doToList: [] }
      ],
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
    rooms: [{ id: "", goals: [{ date: "", doToList: [], comments: [] }] }],
  };
  state.accounts.push(account);
  state.currentAccount = account;
};

export const saveGoalsInfo = function (goalsInfo) {
  state.currentAccount.goals.push(...goalsInfo);
  console.log(state.currentAccount, state.accounts);
};

export const howManyGoals = function () {
  return state.currentAccount.goals.length;
};
