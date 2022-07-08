import { selector } from "recoil";

import { transfersWithDateFilter } from "@recoil/transfers";
import { monthRangeWithMonthBeginning } from "@recoil/monthRange";
import { getMonthRange } from "@services/utils/date";
import subcategoriesWithDatevAccounts from "./withDatevAccounts";

const subcategoriesWithTotals = selector({
  key: "subcategoriesWithTotals",
  default: [],

  get: ({ get }) => {
    const transfers = get(transfersWithDateFilter);
    const subcategories = get(subcategoriesWithDatevAccounts);
    const [from, to] = get(monthRangeWithMonthBeginning);

    if (transfers.isLoading || transfers.error) return transfers;
    if (subcategories.isLoading || subcategories.error) return subcategories;

    const newSubcategories = [];
    if (!transfers.isLoading) {
      const monthRange = getMonthRange(from, to);

      for (const subcategory of subcategories.data) {
        const newSubcategory = { ...subcategory, transfers: [] };
        let addCategory = false;

        for (const month of monthRange) {
          const catTransfers = transfers.data.filter((trsf) => {
            return (
              trsf.datevAccount.subcategory.id === subcategory.id &&
              trsf.date.getMonth() === month.getMonth() &&
              trsf.date.getFullYear() === month.getFullYear()
            );
          });

          const trsfTotal = catTransfers.reduce((total, trsf) => {
            return total + trsf.amount;
          }, 0);

          if (trsfTotal !== 0) {
            addCategory = true;
            newSubcategory.transfers.push({ actual: trsfTotal, date: month });
          }
        }

        if (addCategory) newSubcategories.push(newSubcategory);
      }
    }

    return { isLoading: false, error: null, data: newSubcategories };
  },
});

export default subcategoriesWithTotals;
