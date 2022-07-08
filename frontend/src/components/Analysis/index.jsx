import React from "react";
// import PropTypes from "prop-types";

import { useRecoilState, useRecoilValue } from "recoil";
import monthRangeAtom from "@recoil/monthRange";
// import categoriesAtom from "@recoil/categories/atom";
// import { transfersWithDateFilter } from "@recoil/transfers";
import analysisTableDataAtom from "@recoil/analysisTableData";

import MonthRangePicker from "@components/MonthRangePicker";
import AnTable from "./Table/AnTable";

function Analysis() {
  // const [categories, setCategories] = useRecoilState(categoriesAtom);
  const [monthRange, setMonthRange] = useRecoilState(monthRangeAtom);
  // const transfers = useRecoilValue(transfersWithDateFilter);

  const tableData = useRecoilValue(analysisTableDataAtom);

  if (tableData.isLoading === true) return "Loading...";
  return (
    <>
      <MonthRangePicker value={monthRange} onChange={(v) => setMonthRange(v)} />
      <AnTable headers={tableData.data.headers} data={tableData.data.rows} />
    </>
  );
}

export default Analysis;
