import { selector } from "recoil";

import { getFirstDayOfMonth } from "@services/utils/date";

import monthRangeAtom from "./atom";

const withFirstDayOfMonth = selector({
  key: "monthRangeWithFirstDayOfMonth",
  get: ({ get }) => {
    const range = get(monthRangeAtom);

    return [
      getFirstDayOfMonth({ date: range[0] }),
      getFirstDayOfMonth({ date: range[1] }),
    ];
  },
});

export default withFirstDayOfMonth;
