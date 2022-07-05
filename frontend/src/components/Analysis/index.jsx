import React from "react";

import API from "@services/Api";
import AnTable from "./Table/AnTable";

import "./analysisTable.css";

function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

function selectTableHeaders(headers) {
  const rowHeaders = [[{ colSpan: 2 }], ["", "Account"]];

  const monthlyHeaders = [
    "Actual",
    "Budget",
    "Abs",
    { value: "Perct", className: "pct-header" },
  ];
  for (const header of headers) {
    const date = new Date(header.date).toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });

    rowHeaders[0].push({
      value: date,
      colSpan: 4,
      align: "center",
      key: header.key,
      className: "date-header",
    });

    rowHeaders[1].push(...monthlyHeaders);
  }

  return rowHeaders;
}

function selectTransferData(transfer) {
  let transferAbs = null;
  if (transfer.type === "S") {
    transferAbs = transfer.budget - transfer.actual;
  } else {
    transferAbs = transfer.actual - transfer.budget;
  }

  let transferPerct = null;
  if (transfer.budget > 0)
    transferPerct = (transferAbs / transfer.budget) * 100;
  else transferPerct = transfer.type === "H" ? 100 : -100;

  let transferColor = null;
  if (transferAbs < 0) transferColor = "error.main";
  else if (transferAbs > 0) transferColor = "success.main";

  return {
    abs: round(transferAbs),
    perct: round(transferPerct),
    actual: round(transfer.actual),
    budget: round(transfer.budget),
    color: transferColor,
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
          onCellValueChange(value, "name", dataObject);
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
        value: transfer.actual,
        isEditable,
        onValueChange: (value) => {
          onCellValueChange(value, `actual`, trsf);
        },
      },
      {
        value: transfer.budget,
        isEditable,
        onValueChange: (value) => {
          onCellValueChange(value, `budget`, trsf);
        },
        className: "budget-col",
      },
      { value: transfer.abs, sx: { color: transfer.color } },
      {
        value: transfer.perct,
        sx: { color: transfer.color },
        className: "pct-col",
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

class Analysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: null,
      categories: null,
      subcategories: null,
      datevAccounts: null,
      transfers: null,
      tableHeaders: null,
      rowOpenState: {},

      transferTotals: null,
      tmpTransferTotals: null,

      analysisFrom: "Jan/2019",
      analysisTo: "Mar/2019",
    };

    this.toggleRowCollapse = this.toggleRowCollapse.bind(this);
    this.onCellValueChange = this.onCellValueChange.bind(this);
  }

  async componentDidMount() {
    try {
      const { analysisFrom, analysisTo } = this.state;

      const res = await API.get("analysis", {
        from: analysisFrom,
        to: analysisTo,
      });

      const { categories, subcategories, datevAccounts, transfers } = res.data;
      const transferTotals = selectTransferTotals(transfers);

      this.setState({
        isLoading: false,
        tableHeaders: selectTableHeaders(res.data.dates),
        categories,
        subcategories,
        datevAccounts,
        transferTotals,
      });
    } catch (err) {
      console.error(err);
      this.setState({ isLoading: false, error: "There was an error..." });
    }
  }

  componentDidUpdate(nextProps, prevState) {
    const { transferTotals, tmpTransferTotals } = this.state;
    if (transferTotals === null && prevState.transferTotals !== null)
      this.setState({
        transferTotals: tmpTransferTotals,
        tmpTransferTotals: null,
        isLoading: false,
      });
  }

  onTransferValueChange(value, field, transferObject) {
    const { transferTotals } = this.state;
    const newTransferTotals = [...transferTotals];

    const categoryTotalIndex = transferTotals.findIndex(
      (tt) =>
        tt.categoryId === transferObject.categoryId &&
        tt.cType === "category" &&
        tt.dateKey === transferObject.dateKey
    );

    const subcategoryTotalIndex = transferTotals.findIndex(
      (tt) =>
        tt.subcategoryId === transferObject.subcategoryId &&
        tt.cType === "subcategory" &&
        tt.dateKey === transferObject.dateKey
    );

    const datevTotalIndex = transferTotals.findIndex(
      (tt) =>
        tt.datevAccountId === transferObject.datevAccountId &&
        tt.dateKey === transferObject.dateKey
    );

    value = parseFloat(value);
    for (const tIndex of [
      categoryTotalIndex,
      subcategoryTotalIndex,
      datevTotalIndex,
    ]) {
      const oldTransfer = { ...transferTotals[tIndex] };
      const newValue = parseFloat(
        oldTransfer[field] - transferObject[field] + value
      );

      const newTransfer = { ...oldTransfer, [field]: newValue };
      newTransferTotals.splice(tIndex, 1, newTransfer);
    }

    this.setState({
      transferTotals: newTransferTotals,
      // tmpTransferTotals: newTransferTotals,
      // isLoading: true,
    });
  }

  onCellValueChange(value, field, cellObject) {
    if (field === "name") {
      const { categories, subcategories, datevAccounts } = this.state;
      switch (cellObject.type) {
        case "category":
          this.setState({
            categories: {
              ...categories,
              [cellObject.id]: { ...categories[cellObject.id], [field]: value },
            },
          });
          break;

        case "subcategory":
          this.setState({
            subcategories: {
              ...subcategories,
              [cellObject.id]: {
                ...subcategories[cellObject.id],
                [field]: value,
              },
            },
          });
          break;

        case "datev":
          this.setState({
            datevAccounts: {
              ...datevAccounts,
              [cellObject.id]: {
                ...datevAccounts[cellObject.id],
                [field]: value,
              },
            },
          });
          break;

        default:
      }
    } else {
      this.onTransferValueChange(value, field, cellObject);
    }
  }

  toggleRowCollapse(key, isOpen) {
    const { rowOpenState } = this.state;
    this.setState({ rowOpenState: { ...rowOpenState, [key]: isOpen } });
  }

  render() {
    const { isLoading, tableHeaders, error } = this.state;
    if (isLoading) return "Loading data...";
    if (error) return { error };
    const data = selectTableData(
      this.state,
      this.toggleRowCollapse,
      this.onCellValueChange
    );
    return <AnTable data={data} headers={tableHeaders} />;
  }
}

export default Analysis;
