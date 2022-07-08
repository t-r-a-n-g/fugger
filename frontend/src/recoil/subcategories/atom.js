import { atom } from "recoil";

import Api from "@services/Api";

const getSubcategories = async (setSelf) => {
  try {
    const res = await Api.subcategories.get();
    setSelf({ isLoading: false, data: res.data });
  } catch (err) {
    setSelf({ isLoading: false, error: err });
  }
};

const subcategoriesAtom = atom({
  key: "subcategories",
  default: {
    isLoading: true,
    error: null,
    data: [],
  },
  effects: [
    ({ setSelf }) => {
      getSubcategories(setSelf);
    },
  ],
});

export default subcategoriesAtom;
