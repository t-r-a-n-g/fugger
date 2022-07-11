import { atomFamily } from "recoil";

const categoriesAtom = atomFamily({
  key: "categories",
  default: [],
});

export default categoriesAtom;
