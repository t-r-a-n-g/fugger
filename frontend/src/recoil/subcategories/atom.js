import { atom } from "recoil";

const subcategoriesAtom = atom({
  key: "subcategories",
  default: [],
});

export default subcategoriesAtom;
