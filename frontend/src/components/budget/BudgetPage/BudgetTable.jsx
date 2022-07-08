import React, { useState, useEffect } from "react";

import i18n from "i18next";

import AnTable from "@components/Analysis/Table/AnTable";
import MonthRangePicker from "@components/MonthRangePicker";

import Api from "@services/Api";

// Get the first day of a month from a date
function getFirstDayOfMonth(date) {
  const isValidDate = (d) => d instanceof Date && !Number.isNaN(d.getTime());

  const d = new Date(date);

  if (!isValidDate(d)) return null;
  return new Date(Date.UTC(d.getFullYear(), d.getMonth()));
}

function monthDiff(startDate, endDate) {
  let months;
  months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
  months -= startDate.getMonth();
  months += endDate.getMonth();
  return months <= 0 ? 0 : months;
}

// save date range to local storage
function saveDateRange([from, to]) {
  localStorage.setItem("budgetFrom", getFirstDayOfMonth(from));
  localStorage.setItem("budgetTo", getFirstDayOfMonth(to));
}

// load date range from local storage
function loadDateRange() {
  const from = getFirstDayOfMonth(localStorage.getItem("budgetFrom"));
  const to = getFirstDayOfMonth(localStorage.getItem("budgetTo"));

  if (from && to) return [from, to];
  return null;
}

function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  const rounded = (Math.round(m) / 100) * Math.sign(num);

  return Number.isNaN(rounded) ? 0 : rounded;
}

function selectTransferData(transfer) {
  let transferAbs = null;
  let actualColor = "error.main";
  if (transfer.type === "S") {
    transferAbs = transfer.budget - transfer.actual;
  } else {
    actualColor = "success.main";
    transferAbs = transfer.actual - transfer.budget;
  }

  let transferPerct = null;
  if (transfer.budget > 0)
    transferPerct = (transferAbs / transfer.budget) * 100;
  else transferPerct = transfer.type === "H" ? 100 : -100;

  let transferAbsColor = null;
  if (transferAbs < 0) transferAbsColor = "error.main";
  else if (transferAbs > 0) transferAbsColor = "success.main";

  return {
    abs: round(transferAbs),
    perct: round(transferPerct),
    actual: round(transfer.actual),
    budget: round(transfer.budget),
    absColor: transferAbsColor,
    actualColor,
  };
}

function selectRowData(
  dataObject,
  state,
  toggleRowCollapse,
  onCellValueChange
) {
  const key = `${dataObject.type}-${dataObject.id}`;
  const isOpen = state.rowOpenState[key] || false;
  let childIds = [];
  if (dataObject.childIds) childIds = Object.keys(dataObject.childIds);

  let childObjects = [];

  switch (dataObject.type) {
    case "category":
      childObjects = state.subcategories;
      break;
    case "subcategory":
      childObjects = state.datevAccounts;
      break;
    default:
      break;
  }

  const row = {
    key,
    isOpen,
    toggleOpen: () => {
      toggleRowCollapse(key, !isOpen);
    },
    hasChildren: Array.isArray(childIds) && childIds.length > 0,
    childRows: isOpen
      ? childIds.map((childId) => {
          const childDataObject = childObjects[childId];
          return selectRowData(
            childDataObject,
            state,
            toggleRowCollapse,
            onCellValueChange
          );
        })
      : [],
    cellData: [
      {
        value: dataObject.name,
        isEditable: true,
        onValueChange: (value) => {
          return onCellValueChange(value, "name", dataObject);
        },
      },
    ],
  };

  const monthlyTransfers = state.transferTotals
    .filter(
      (tt) => tt.parentId === dataObject.id && tt.cType === dataObject.type
    )
    .sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });

  const monthlyCells = monthlyTransfers.map((trsf) => {
    const transfer = selectTransferData(trsf);
    const isEditable = dataObject.type === "datev";

    return [
      {
        value: transfer.budget,
        isEditable,
        onValueChange: (value) => {
          return onCellValueChange(value, `budget`, trsf);
        },
        className: "budget-col",
      },
    ];
  });

  for (const month of monthlyCells) row.cellData.push(...month);
  return row;
}

function selectTableData(state, toggleRowCollapse, onCellValueChange) {
  const data = [];
  for (const category of Object.values(state.categories)) {
    data.push(
      selectRowData(category, state, toggleRowCollapse, onCellValueChange)
    );
  }

  return data;
}

function selectTransferTotals(transfers) {
  const transferTotals = [];

  for (const transfer of transfers) {
    for (const type of ["category", "subcategory", "datev"]) {
      let parentId = transfer.datevAccountId;
      if (type === "category") parentId = transfer.categoryId;
      else if (type === "subcategory") parentId = transfer.subcategoryId;

      let transferTotal = transferTotals.find(
        (tt) =>
          tt.date === transfer.date &&
          tt.parentId === parentId &&
          tt.cType === type
      );

      if (!transferTotal) {
        transferTotal = {
          ...transfer,
          parentId,
          cType: type,
          actual: 0,
          budget: 0,
        };
        transferTotals.push(transferTotal);
      }

      transferTotal.actual += transfer.actual;
      transferTotal.budget += transfer.budget;
    }
  }

  return transferTotals;
}

function BudgetTable() {
  // initialize with current date (set to beginning of month)
  const [monthRange, setMonthRange] = useState([
    getFirstDayOfMonth(new Date()),
    getFirstDayOfMonth(new Date()),
  ]);

  const [rowOpenState, setRowOpenState] = useState({});

  const [tableHeaders, setTableHeaders] = useState([[]]);
  const [budgetData, setBudgetData] = useState([]);

  useEffect(() => {
    // get the date range
    const range = loadDateRange();

    // if they don't exist / are not valid dates, store the default state value (current month)
    if (!range) saveDateRange(monthRange);
    // otherwise store them in state
    else setMonthRange(range);
  }, []);

  useEffect(() => {
    async function getBudgets() {
      const res = await Api.get("analysis", {
        from: monthRange[0],
        to: monthRange[1],
      });

      const { categories, subcategories, datevAccounts, transfers } = res.data;
      const transferTotals = selectTransferTotals(transfers);

      // setCategories(categories);
      // setSubcategories(subcategories);
      // setDatevAccounts(datevAccounts);
      // selectTransferTotals(transferTotals);

      setBudgetData(
        selectTableData(
          {
            categories,
            subcategories,
            datevAccounts,
            transferTotals,
            rowOpenState,
          },
          (key, isOpen) => {
            setRowOpenState({ ...rowOpenState, [key]: isOpen });
          },
          () => {}
        )
      );
      // setBudgets(res.data);
    }

    // query the backend when monthRange changes
    getBudgets();

    // set the table headers according to selected month range
    const diff = monthDiff(monthRange[0], monthRange[1]) + 1;
    const headers = ["", "Account"];

    let currentMonth = monthRange[0].getMonth();
    let currentYear = monthRange[0].getFullYear();
    for (let i = 0; i < diff; i++) {
      if (currentMonth >= 12) {
        currentMonth = 0;
        currentYear += 1;
      }

      const currentDate = new Date(Date.UTC(currentYear, currentMonth));
      const dateString = currentDate.toLocaleDateString(i18n.language, {
        month: "long",
        year: "numeric",
      });

      headers.push(dateString);
      currentMonth += 1;
    }

    setTableHeaders([headers]);
    // setBudgetData(getBudgetData(budgets));
  }, [monthRange, rowOpenState]);

  const onDateChange = ([from, to]) => {
    // parse dates and get current month
    const budgetFrom = getFirstDayOfMonth(from);
    const budgetTo = getFirstDayOfMonth(to);

    // if valid, save them and update state
    if (budgetFrom && budgetTo) {
      saveDateRange([budgetFrom, budgetTo]);
      setMonthRange([budgetFrom, budgetTo]);
    }
  };

  return (
    <>
      <MonthRangePicker value={monthRange} onChange={onDateChange} />
      <AnTable data={budgetData} headers={tableHeaders} />
    </>
  );
}

export default BudgetTable;
