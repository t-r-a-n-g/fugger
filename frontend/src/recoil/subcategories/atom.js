import { atomFamily } from "recoil";

const subcategoriesAtom = atomFamily({
  key: "subcategoriesAtom",
  default: [],
});

export default subcategoriesAtom;
