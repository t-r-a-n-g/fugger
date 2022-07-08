import { atom } from "recoil";

import Api from "@services/Api";

const getCategories = async (set) => {
  try {
    const res = await Api.categories.get();
    set({ isLoading: false, data: res.data });
  } catch (err) {
    set({ isLoading: false, error: err });
  }
};

const categoriesAtom = atom({
  key: "categories",
  default: {
    isLoading: true,
    error: null,
    data: [],
  },
  effects: [
    ({ setSelf }) => {
      getCategories(setSelf);
    },
  ],
});

export default categoriesAtom;
