import { atom } from "recoil";

const categoriesAtom = atom({
  key: "categories",
  default: [],
});

export default categoriesAtom;
