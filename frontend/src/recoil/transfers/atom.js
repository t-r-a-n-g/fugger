import { atom } from "recoil";
import Api from "@services/Api";

const getTransfers = async (setSelf) => {
  try {
    const res = await Api.transfers.get();
    setSelf({ isLoading: false, data: res.data, error: null });
  } catch (err) {
    setSelf({ isLoading: false, error: err, data: [] });
  }
};

const transfersAtom = atom({
  key: "transfersAtom",
  default: {
    isLoading: true,
    error: null,
    data: [],
  },

  effects: [({ setSelf }) => getTransfers(setSelf)],
});

export default transfersAtom;
