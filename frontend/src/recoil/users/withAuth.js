import { selector } from "recoil";

import userAtom from "./atom";

const userWithAuth = selector({
  key: "userWithAuth",

  get: ({ get }) => {
    const user = get(userAtom);
    return { isAuthenticated: user.isAuthenticated, isLoading: user.isLoading };
  },

  set: ({ set }, newValue) => {
    set(userAtom, {
      isLoading: false,
      isAuthenticated: true,
      data: { ...newValue },
      isNew: true,
    });
  },
});

export default userWithAuth;
