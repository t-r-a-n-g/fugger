import { atom } from "recoil";

import Api from "@services/Api";

const getDatevAccounts = async (set) => {
  try {
    const res = await Api.datevAccounts.get();
    set({ isLoading: false, data: res.data });
  } catch (err) {
    set({ isLoading: false, error: err });
  }
};

const datevAccountsAtom = atom({
  key: "datevAccountsAtom",
  default: {
    isLoading: true,
    error: null,
    data: [],
  },
  effects: [
    ({ setSelf }) => {
      getDatevAccounts(setSelf);
    },
  ],
});

export default datevAccountsAtom;
