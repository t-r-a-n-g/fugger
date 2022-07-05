import { selector } from "recoil";

import transfersAtom from "@recoil/transfers";
import categoriesAtom from "./atom";

const categoriesWithTransfers = selector({
  key: "categoriesWithTransfers",
  get: ({ get }) => {
    const categories = get(categoriesAtom);
    const transfers = get(transfersAtom);

    const newCategories = [];
    for (const category of categories) {
      const catTrsfs = transfers.filter(
        (trsf) => trsf.categoryId === category.id
      );
      newCategories.push({ ...category, transfers: catTrsfs });
    }

    return newCategories;
  },
});

export default categoriesWithTransfers;
