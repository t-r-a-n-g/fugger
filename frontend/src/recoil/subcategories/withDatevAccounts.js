import { selector } from "recoil";

import { datevAccountsWithTotals } from "@recoil/datevAccounts";
import subcategoriesAtom from "./atom";

const subcategoriesWithDatevAccounts = selector({
  key: "subcategoriesWithDatevAccounts",
  default: {
    isLoading: true,
    error: null,
    data: [],
  },

  get: ({ get }) => {
    const subcategories = get(subcategoriesAtom);
    const datevAccounts = get(datevAccountsWithTotals);

    if (subcategories.isLoading || datevAccounts.isLoading)
      return subcategories;
    if (subcategories.error) return subcategories;
    if (datevAccounts.error) return datevAccounts;

    const newSubcategories = [];
    for (const subcategory of subcategories.data) {
      newSubcategories.push({
        ...subcategory,
        datevAccounts: datevAccounts.data.filter(
          (dtv) => dtv.subcategoryId === subcategory.id
        ),
      });
    }

    return { isLoading: false, error: null, data: newSubcategories };
  },
});

export default subcategoriesWithDatevAccounts;
