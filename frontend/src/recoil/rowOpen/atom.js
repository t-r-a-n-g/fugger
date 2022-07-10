import { atom, atomFamily, selectorFamily } from "recoil";

const rowOpenAtom = atom({
  key: "rowOpenAtom",
  default: {},
});

const rowOpenAtomFamily = atomFamily({
  key: "rowOpenAtomFamily",
  default: selectorFamily({
    get:
      (id) =>
      ({ get }) => {
        const rowOpenState = get(rowOpenAtom);
        return rowOpenState[id] ?? {};
      },

    set:
      (id) =>
      ({ set }, newValue) => {
        set(rowOpenAtom[id], newValue);
      },
  }),
});

export default rowOpenAtomFamily;
