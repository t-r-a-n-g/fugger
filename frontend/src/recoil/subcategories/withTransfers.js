import { selector } from "recoil";

import transfersAtom from "@recoil/transfers";
import subcategoriesAtom from "./atom";

const subcategoriesWithTransfers = selector({
  key: "subcategoriesWithTransfers",
  get: ({ get }) => {
    const subcategories = get(subcategoriesAtom);
    const transfers = get(transfersAtom);
    const newSubcategories = [];

    for (const subcategory of subcategories) {
      const catTrsfs = transfers.filter(
        (trsf) => trsf.subcategoryId === subcategory.id
      );
      newSubcategories.push({ ...subcategory, transfers: catTrsfs });
    }

    return newSubcategories;
  },
});

export default subcategoriesWithTransfers;
