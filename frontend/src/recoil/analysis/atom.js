import { atom, useRecoilValue } from "recoil";

const analysisAtom = atom({
  key: "analysisAtom",
  default: {
    from: "Jan/19",
    to: "Dez/19",
  },

  effects: [
    ({ setSelf }) => {
      setSelf((currentState) => {});
    },
  ],
});

export default analysisAtom;
