import { selectorFamily } from "recoil";

import { getFirstDayOfMonth } from "@services/utils/date";

import monthRangeAtom from "./atom";

const withFirstDayOfMonth = selectorFamily({
  key: "monthRangeWithFirstDayOfMonth",
  get:
    (table) =>
    ({ get }) => {
      const range = get(monthRangeAtom(table));

      return [
        getFirstDayOfMonth({ date: range[0] }),
        getFirstDayOfMonth({ date: range[1] }),
      ];
    },
});

export default withFirstDayOfMonth;
