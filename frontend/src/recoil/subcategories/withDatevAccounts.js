import { selector } from "recoil";

import datevAccountsAtom from "@recoil/datevAccounts";
import subcategoriesAtom from "./atom";

const subcategoriesWithDatevAccounts = selector({
  key: "subcategoriesWithDatevAccounts",
  get: ({ get }) => {
    const subcategories = get(subcategoriesAtom);
    const datevAccounts = get(datevAccountsAtom);

    const newSubcategories = [];
    for (const subcategory of subcategories) {
      newSubcategories.push({
        ...subcategory,
        children: datevAccounts.filter(
          (dtv) => dtv.subcategoryId === subcategory.id
        ),
      });
    }

    return newSubcategories;
  },
});

export default subcategoriesWithDatevAccounts;
