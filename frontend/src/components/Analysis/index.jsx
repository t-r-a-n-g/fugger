import React from "react";
import PropTypes from "prop-types";

import i18n from "i18next";
import { withTranslation } from "react-i18next";

import API from "@services/Api";
import SuccessModal from "@components/budget/SuccessModel";

import MonthRangePicker from "@components/MonthRangePicker";

import AnTable from "./Table/AnTable";

import "./analysisTable.css";

/* --------------- states for Budget Editing (via Button) ------------------------ */
  const [open, setOpen] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
 /* ------------------------------------------------------------------------------- */

function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

function selectTableHeaders(headers, t) {
  const rowHeaders = [[{ colSpan: 2 }], ["", "Account"]];

  const monthlyHeaders = [
    t("actual"),
    t("budget"),
    t("abs"),
    { value: t("perct"), className: "pct-header" },
  ];
  for (const header of headers) {
    const date = new Date(header.date).toLocaleDateString(i18n.language, {
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
        value: transfer.actual,
        isEditable,
        onValueChange: (value) => {
          return onCellValueChange(value, `actual`, trsf);
        },
        sx: { color: transfer.actualColor },
      },
      {
        value: transfer.budget,
        isEditable,
        onValueChange: (value) => {
          return onCellValueChange(value, `budget`, trsf);
        },
        className: "budget-col",
      },
      { value: transfer.abs, sx: { color: transfer.absColor } },
      {
        value: `${transfer.perct}%`,
        sx: { color: transfer.absColor },
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

      analysisFrom: null, // "Jan/2019",
      analysisTo: null, // "Mar/2019",
    };

    this.toggleRowCollapse = this.toggleRowCollapse.bind(this);
    this.onCellValueChange = this.onCellValueChange.bind(this);
    this.onDateRangeChange = this.onDateRangeChange.bind(this);
  }

  async componentDidMount() {
    const localFrom = localStorage.getItem("analysisFrom");
    const localTo = localStorage.getItem("analysisTo");

    const fromDate = localFrom ? new Date(localFrom) : new Date();
    const toDate = localTo ? new Date(localTo) : new Date();

    this.onDateRangeChange([fromDate, toDate]);
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

  onDateRangeChange([from, to]) {
    this.setState({ analysisFrom: from, analysisTo: to });
    this.loadAnalysisData(from, to);
    localStorage.setItem("analysisFrom", from);
    localStorage.setItem("analysisTo", to);
  }

  async onTransferValueChange(value, field, transferObject) {
    const { transferTotals } = this.state;
    const newTransferTotals = [...transferTotals];
    value = parseFloat(value);
    if (Number.isNaN(value)) return false;

    let { type } = transferObject;
    if (value < 0) {
      type = type === "S" ? "H" : "S";
      value = Math.abs(value);
    }

    try {
      if (field === "actual")
        await API.put(`transfer/${transferObject.id}`, {
          amount: type === "H" ? value : -value,
        });
    } catch (err) {
      return false;
    }

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

    return true;
  }

  async onCellValueChange(value, field, cellObject) {
    if (field === "name") {
      try {
        const apiUrl = `${cellObject.type}/${cellObject.id}`;
        await API.put(apiUrl, { name: value });
      } catch (err) {
        return false;
      }

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
      return this.onTransferValueChange(value, field, cellObject);
    }
    return true;
  }

  toggleRowCollapse(key, isOpen) {
    const { rowOpenState } = this.state;
    this.setState({ rowOpenState: { ...rowOpenState, [key]: isOpen } });
  }

  async loadAnalysisData(from, to) {
    try {
      const res = await API.get("analysis", {
        from: new Date(Date.UTC(from.getFullYear(), from.getMonth())),
        to,
      });

      const { categories, subcategories, datevAccounts, transfers } = res.data;
      const transferTotals = selectTransferTotals(transfers);
      const { t } = this.props;
      this.setState({
        isLoading: false,
        tableHeaders: selectTableHeaders(res.data.dates, t),
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

  render() {
    const { isLoading, tableHeaders, error, analysisFrom, analysisTo } =
      this.state;
    if (isLoading) return "Loading data...";
    if (error) return { error };
    const data = selectTableData(
      this.state,
      this.toggleRowCollapse,
      this.onCellValueChange
    );
    return (
      <>
      <Button
        sx={{ borderRadius: "10px", marginBottom: 4 }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Specify budget
      </Button>
      <SuccessModal
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
      />
      <BudgetEditing
        open={open}
        setOpen={setOpen}
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
      />
        <MonthRangePicker
          onChange={this.onDateRangeChange}
          value={[analysisFrom, analysisTo]}
        />
        <AnTable data={data} headers={tableHeaders} />
      </>
    );
  }
}

Analysis.propTypes = {
  t: PropTypes.func.isRequired,
};

export default withTranslation()(Analysis);
