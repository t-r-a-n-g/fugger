import { selector } from "recoil";

import { monthRangeWithMonthBeginning } from "@recoil/monthRange";
import transfersAtom from "./atom";

const transfersWithDateFilter = selector({
  key: "transfersWithDateFilter",
  get: ({ get }) => {
    const transfers = get(transfersAtom);
    const [from, to] = get(monthRangeWithMonthBeginning);

    if (transfers.isLoading || transfers.error) return transfers;
    return {
      ...transfers,
      data: transfers.data.reduce((filtered, trsf) => {
        const transfer = { ...trsf, date: new Date(trsf.date) };

        if (transfer.date >= from && transfer.date <= to)
          filtered.push(transfer);

        return filtered;
      }, []),
    };
  },
});

export default transfersWithDateFilter;
