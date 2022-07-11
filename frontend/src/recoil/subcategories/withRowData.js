import { selectorFamily } from "recoil";

import tableDataAtom from "@recoil/tableData";

const subcategoriesWithRowData = selectorFamily({
  key: "subcategoriesWithRowData",
  get:
    (table) =>
    ({ get }) => {
      const tableData = get(
        tableDataAtom({
          table,
          type: "subcategory",
        })
      );

      return tableData;
    },

  set:
    (table) =>
    ({ set }, newValue) => {
      set(tableDataAtom({ table, type: "subcategory" }), newValue);
    },
});

export default subcategoriesWithRowData;
