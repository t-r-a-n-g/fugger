import { selector } from "recoil";

import i18n from "i18next";

import { monthRangeWithMonthBeginning } from "@recoil/monthRange";
import { categoriesWithSubcategories } from "@recoil/categories";
import rowOpenAtomFamily from "@recoil/rowOpen";

import { getMonthRange } from "@services/utils/date";

const getHeaders = ([from, to]) => {
  const headers = [
    [{ colSpan: 2 }],
    [
      { className: "firstColumn" },
      { value: "Account", className: "accounts-header-col" },
    ],
  ];

  const monthlyHeaders = [
    "Actual",
    "Budget",
    "Abs",
    { value: "Perct", className: "pct-header" },
  ];

  const monthRange = getMonthRange(from, to);
  for (const month of monthRange) {
    const date = month.toLocaleDateString(i18n.language, {
      month: "long",
      year: "numeric",
    });

    headers[0].push({
      value: date,
      colSpan: 4,
      align: "center",
      key: month.getTime(),
      className: "date-header",
    });

    headers[1].push(...monthlyHeaders);
  }

  return headers;
};

function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  const rounded = (Math.round(m) / 100) * Math.sign(num);

  return Number.isNaN(rounded) ? 0 : rounded;
}

function getRowData(dataObject) {}

const analysisTableDataAtom = selector({
  key: "analysisTableDataAtom",
  default: [],
  get: ({ get }) => {
    const categories = get(categoriesWithSubcategories);
    if (categories.isLoading || categories.error) return categories;

    const rowOpenState = get(rowOpenAtomFamily("analysis"));
    const monthRange = get(monthRangeWithMonthBeginning);

    const headers = getHeaders(monthRange);

    const rows = [];

    for (const category of categories.data) {
      const key = `cat-${category.id}`;
      const isOpen = rowOpenState[key] ?? false;
      const row = {
        cellData: ["Bla"],
        childRows: [],
        hasChildren: false,
        isOpen,
        key,
        toggleOpen: () => {},
      };

      rows.push(row);
    }

    return { isLoading: false, error: null, data: { rows, headers } };
  },
});

export default analysisTableDataAtom;
