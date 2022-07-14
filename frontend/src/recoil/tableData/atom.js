import { atomFamily, selectorFamily } from "recoil";

import i18n from "i18next";

import rowOpenAtomFamily from "@recoil/rowOpen";
import { monthRangeWithMonthBeginning } from "@recoil/monthRange";

import categoriesAtom from "@recoil/categories";
import subcategoriesAtom from "@recoil/subcategories";
import datevAccountsAtom from "@recoil/datevAccounts";

import { getMonthRange } from "@services/utils/date";
import { calculateDiff, round } from "@services/utils/math";

const getHeaders = ([from, to], table) => {
  const headers = [
    [{ colSpan: 2 }],
    [
      { className: "firstColumn empty-header" },
      { value: "Account", className: "accounts-header-col" },
    ],
  ];

  let monthlyHeaders = [];
  if (table === "analysis") {
    monthlyHeaders = [
      "Actual",
      "Budget",
      "Abs",
      { value: "Perct", className: "pct-header" },
    ];
  } else if (table === "budget") monthlyHeaders = ["Budget"];

  const monthRange = getMonthRange(from, to);
  for (const month of monthRange) {
    const date = month.toLocaleDateString(i18n.language, {
      month: "long",
      year: "numeric",
    });

    headers[0].push({
      value: date,
      colSpan: monthlyHeaders.length,
      align: "center",
      key: month.getTime(),
      className: "date-header",
    });

    headers[1].push(...monthlyHeaders);
  }

  return headers;
};

function getRow(table, dataObject, rowOpenState) {
  const isDatev = dataObject.type === "datevAccount";
  const key = `${dataObject.type}-${dataObject.id}`;

  const isOpen = rowOpenState[key];
  const hasChildren = !isDatev;

  const label = isDatev
    ? `(${dataObject.number}) ${dataObject.name}`
    : dataObject.name;

  const nameCellKey = `${dataObject.type}-${dataObject.id}-name`;

  const cellData = {
    [nameCellKey]: {
      value: dataObject.name,
      isEditable: true,
      label,
      accNumber: dataObject.number,
      field: "name",
      key: nameCellKey,
    },
  };

  for (const monthSum of Object.values(dataObject.totalSums)) {
    const { actual, budget, type } = monthSum;
    const { abs, pct } = calculateDiff(actual, budget);
    for (const [field, value] of Object.entries({
      actual,
      budget,
      abs,
      pct,
    })) {
      const cellKey = `${dataObject.type}-${dataObject.id}-${field}-${monthSum.date}`;
      const sx = {
        color: value < 0 ? "error.main" : "success.main",
      };

      cellData[cellKey] = {
        key: cellKey,
        value,
        label: round(value),
        isEditable: isDatev && !["abs", "pct"].includes(field),
        sx,
        field,
        type,
        className: `${field}-col`,
        transferId: monthSum.transferId || null,
        budgetId: monthSum.budgetId || null,
      };
    }
  }

  const rowObject = {
    key,
    isOpen,
    hasChildren,
    isChild: dataObject.type !== "category",
    cellData,
    type: dataObject.type,
    id: dataObject.id,
    categoryId: dataObject.categoryId || null,
    subcategoryId: dataObject.subcategoryId || null,
  };

  return rowObject;
}

const tableDataAtom = atomFamily({
  key: "tableDataAtom",
  default: selectorFamily({
    key: "tableDataSelector",
    get:
      ({ table, type }) =>
      ({ get }) => {
        const monthRange = get(monthRangeWithMonthBeginning(table));
        if (type === "headers") {
          return getHeaders(monthRange, table);
        }

        let dataObjects = [];
        switch (type) {
          case "datevAccount":
            dataObjects = get(datevAccountsAtom(table));
            break;

          case "subcategory":
            dataObjects = get(subcategoriesAtom(table));
            break;

          case "category":
          default:
            dataObjects = get(categoriesAtom(table));
            break;
        }
        const rowOpenState = get(rowOpenAtomFamily(`${table}-${type}`));
        return dataObjects.map((dO) => getRow(table, dO, rowOpenState));
      },
  }),
});

export default tableDataAtom;
