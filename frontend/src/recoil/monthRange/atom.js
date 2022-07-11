import { atomFamily } from "recoil";

import { isValidDate } from "@services/utils/date";

const saveToLocalStorage = ([from, to], table) => {
  if (isValidDate(from) && isValidDate(to)) {
    localStorage.setItem(`${table}-from`, from);
    localStorage.setItem(`${table}-to`, to);
  }
};

const initialize = ({ setSelf, onSet }, table) => {
  const fromStr = localStorage.getItem(`${table}-from`);
  const toStr = localStorage.getItem(`${table}-to`);

  if (fromStr && toStr) {
    const from = new Date(fromStr);
    const to = new Date(toStr);
    if (isValidDate(from) && isValidDate(to)) setSelf([from, to]);
  }
  onSet((newValue) => saveToLocalStorage(newValue, table));
};

const monthRangeAtom = atomFamily({
  key: "monthRangeAtom",
  default: [new Date(), new Date()],
  effects: (table) => [
    ({ setSelf, onSet }) => initialize({ setSelf, onSet }, table),
  ],
});

export default monthRangeAtom;
