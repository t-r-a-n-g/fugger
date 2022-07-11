import { selectorFamily } from "recoil";

import tableDataAtom from "@recoil/tableData";

const categoriesWithRowData = selectorFamily({
  key: "categoriesWithRowData",
  get:
    (table) =>
    ({ get }) => {
      const tableData = get(
        tableDataAtom({
          table,
          type: "category",
        })
      );

      return tableData;
    },

  set:
    (table) =>
    ({ set }, newValue) => {
      set(tableDataAtom({ table, type: "category" }), newValue);
    },
});

export default categoriesWithRowData;
