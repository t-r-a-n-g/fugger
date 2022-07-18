import { atom, selector } from "recoil";

import Api from "@services/Api";

const userAtom = atom({
  key: "userAtom",
  default: {
    isLoading: true,
    isAuthenticated: false,
    data: {},
  },

  effects: [
    ({ setSelf }) => {
      async function fetchUser() {
        try {
          const res = await Api.auth.me();
          setSelf({ isLoading: false, isAuthenticated: true, data: res.data });
        } catch (err) {
          setSelf({ isLoading: false, isAuthenticated: false, data: {} });
        }
      }
      fetchUser();
    },
  ],
});

const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    const user = get(userAtom);
    return user;
  },
  set: ({ set, get }, newValue) => {
    if (newValue === null) {
      Api.auth.logout();
      set(userAtom, { isAuthenticated: false, isLoading: false, data: {} });
    } else if (newValue.isNew === true) {
      delete newValue.isNew;
      set(userAtom, newValue);
    } else {
      const user = get(userAtom);
      const newUser = { ...user, data: { ...user.data, ...newValue } };

      Api.users.put(newValue);
      set(userAtom, newUser);
    }
  },
});
export default userSelector;
