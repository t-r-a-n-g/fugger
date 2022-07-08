import { selector } from "recoil";

import { subcategoriesWithDatevAccounts } from "@recoil/subcategories";
import categoriesAtom from "./atom";

const categoriesWithSubcategories = selector({
  key: "categoriesWithSubcategories",
  default: {
    isLoading: true,
    error: null,
    data: [],
  },

  get: ({ get }) => {
    const subcategories = get(subcategoriesWithDatevAccounts);
    const categories = get(categoriesAtom);

    if (categories.isLoading || subcategories.isLoading) return categories;
    if (categories.error) return categories;
    if (subcategories.error) return subcategories;

    const newCategories = [];
    for (const category of categories.data) {
      newCategories.push({
        ...category,
        subcategories: subcategories.data.filter(
          (sc) => sc.categoryId === category.id
        ),
      });
    }

    return { isLoading: false, error: null, data: newCategories };
  },
});

export default categoriesWithSubcategories;
