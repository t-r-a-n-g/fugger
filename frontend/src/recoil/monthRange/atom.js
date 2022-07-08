import { atom } from "recoil";

import { isValidDate } from "@services/utils/date";

const saveToLocalStorage = ([from, to]) => {
  if (isValidDate(from) && isValidDate(to)) {
    localStorage.setItem("from", from);
    localStorage.setItem("to", to);
  }
};

const initialize = ({ setSelf, onSet }) => {
  const from = new Date(localStorage.getItem("from"));
  const to = new Date(localStorage.getItem("to"));

  if (isValidDate(from) && isValidDate(to)) setSelf([from, to]);

  onSet(saveToLocalStorage);
};

const monthRangeAtom = atom({
  key: "monthRangeAtom",
  default: [new Date(), new Date()],
  effects: [initialize],
});

export default monthRangeAtom;
