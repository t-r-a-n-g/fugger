import { selectorFamily } from "recoil";

import tableDataAtom from "@recoil/tableData";

const datevAccountsWithRowData = selectorFamily({
  key: "datevAccountsWithRowData",
  get:
    (table) =>
    ({ get }) => {
      const tableData = get(
        tableDataAtom({
          table,
          type: "datevAccount",
        })
      );

      return tableData;
    },

  set:
    (table) =>
    ({ set }, newValue) => {
      set(tableDataAtom({ table, type: "datevAccount" }), newValue);
    },
});

export default datevAccountsWithRowData;
