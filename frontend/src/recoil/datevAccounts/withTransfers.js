import { selector } from "recoil";

import transfersAtom from "@recoil/transfers";
import datevAccountsAtom from "./atom";

const datevAccountsWithTransfers = selector({
  key: "datevAccountsWithTransfers",
  get: ({ get }) => {
    const datevAccounts = get(datevAccountsAtom);
    const transfers = get(transfersAtom);
    const newDatevAccounts = [];

    for (const account of datevAccounts) {
      const dtvTrsfs = transfers.filter(
        (trsf) => trsf.datevAccountId === account.id
      );
      newDatevAccounts.push({ ...account, transfers: dtvTrsfs });
    }

    return newDatevAccounts;
  },
});

export default datevAccountsWithTransfers;
