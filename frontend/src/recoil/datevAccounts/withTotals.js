import { selector } from "recoil";

import { transfersWithDateFilter } from "@recoil/transfers";
import { monthRangeWithMonthBeginning } from "@recoil/monthRange";
import { getMonthRange } from "@services/utils/date";

import datevAccountsAtom from "./atom";

const datevAccountsWithTotals = selector({
  key: "datevAccountsWithTotals",
  default: [],

  get: ({ get }) => {
    const transfers = get(transfersWithDateFilter);
    const datevAccounts = get(datevAccountsAtom);
    const [from, to] = get(monthRangeWithMonthBeginning);

    if (transfers.isLoading || transfers.error) return transfers;
    if (datevAccounts.isLoading || datevAccounts.error) return datevAccounts;

    const newDatevAccounts = [];
    const monthRange = getMonthRange(from, to);

    for (const datevAccount of datevAccounts.data) {
      const newDatevAccount = { ...datevAccount, transfers: [] };
      let addAccount = false;

      for (const month of monthRange) {
        const dtvTransfers = transfers.data.filter((trsf) => {
          return (
            trsf.datevAccount.id === datevAccount.id &&
            trsf.date.getMonth() === month.getMonth() &&
            trsf.date.getFullYear() === month.getFullYear()
          );
        });

        const trsfTotal = dtvTransfers.reduce((total, trsf) => {
          return total + trsf.amount;
        }, 0);

        if (trsfTotal !== 0) {
          addAccount = true;
          newDatevAccount.transfers.push({ actual: trsfTotal, date: month });
        }
      }

      if (addAccount) newDatevAccounts.push(newDatevAccount);
    }

    return { isLoading: false, error: null, data: newDatevAccounts };
  },
});

export default datevAccountsWithTotals;
