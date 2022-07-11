import { selector } from "recoil";

import { subcategoriesWithDatevAccounts } from "@recoil/subcategories";
import categoriesAtom from "./atom";

const categoriesWithSubcategories = selector({
  key: "categoriesWithSubcategories",

  get: ({ get }) => {
    const subcategories = get(subcategoriesWithDatevAccounts);
    const categories = get(categoriesAtom);

    const newCategories = [];
    for (const category of categories) {
      newCategories.push({
        ...category,
        children: subcategories.filter((sc) => sc.categoryId === category.id),
      });
    }

    return newCategories;
  },
});

export default categoriesWithSubcategories;
