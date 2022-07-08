import { selector } from "recoil";

import { transfersWithDateFilter } from "@recoil/transfers";
import { monthRangeWithMonthBeginning } from "@recoil/monthRange";
import { getMonthRange } from "@services/utils/date";
import categoriesWithSubcategories from "./withSubcategories";

const categoriesWithTotals = selector({
  key: "categoriesWithTransferTotals",
  default: [],

  get: ({ get }) => {
    const transfers = get(transfersWithDateFilter);
    const categories = get(categoriesWithSubcategories);
    const [from, to] = get(monthRangeWithMonthBeginning);

    if (categories.isLoading || categories.error) return categories;

    const newCategories = [];
    if (!transfers.isLoading) {
      const monthRange = getMonthRange(from, to);
      for (const category of categories.data) {
        const newCategory = { ...category, transfers: [] };
        let addCategory = false;

        for (const month of monthRange) {
          const catTransfers = transfers.data.filter((trsf) => {
            return (
              trsf.datevAccount.subcategory.category.id === category.id &&
              trsf.date.getMonth() === month.getMonth() &&
              trsf.date.getFullYear() === month.getFullYear()
            );
          });

          const trsfTotal = catTransfers.reduce((total, trsf) => {
            return total + trsf.amount;
          }, 0);

          if (trsfTotal !== 0) {
            addCategory = true;
            newCategory.transfers.push({ actual: trsfTotal, date: month });
          }
        }

        if (addCategory) newCategories.push(newCategory);
      }
    }

    return { isLoading: false, error: null, data: newCategories };
  },
});

export default categoriesWithTotals;
