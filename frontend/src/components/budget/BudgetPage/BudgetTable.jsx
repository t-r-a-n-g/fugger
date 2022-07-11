import { useRecoilState } from "recoil";

import { round } from "@services/utils/math";

import monthRangeAtom from "@recoil/monthRange";

import useTableData from "@hooks/useTableData";

import MonthRangePicker from "@components/MonthRangePicker";

import Api from "@services/Api";
import AnTable from "@components/Analysis/Table/AnTable";
import AnTableRow from "@components/Analysis/Table/AnTableRow";
import AnTableCell from "@components/Analysis/Table/AnTableCell";

import "@components/Analysis/analysisTable.css";

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function BudgetTable() {
  const {
    isLoading,
    error,
    categoryRows,
    setCategoryRows,
    subcategoryRows,
    setSubcategoryRows,
    datevRows,
    setDatevRows,
    headers,
  } = useTableData({ table: "budgets" });

  const [monthRange, setMonthRange] = useRecoilState(monthRangeAtom("budgets"));

  function onNameChange(dataObject, key, newValue, oldValue) {
    if (newValue === oldValue) return false;

    let rowObjects = null;
    let setState = null;
    let api = null;

    switch (dataObject.type) {
      case "category":
        rowObjects = deepCopy(categoryRows);
        setState = setCategoryRows;
        api = Api.categories;
        break;
      case "subcategory":
        rowObjects = deepCopy(subcategoryRows);
        setState = setSubcategoryRows;
        api = Api.subcategories;
        break;
      case "datevAccount":
        rowObjects = deepCopy(datevRows);
        setState = setDatevRows;
        api = Api.datevAccounts;
        break;
      default:
        return false;
    }

    const rowObject = rowObjects.find((row) => row.id === dataObject.id);
    rowObject.cellData[key].value = newValue;

    const { label } = rowObject.cellData[key];
    rowObject.cellData[key].label = label.replace(oldValue, newValue);

    setState(rowObjects);

    api.put({ name: newValue }, rowObject.id);
    return true;
  }

  function onCellValueChange(dataObject, key, field, newValue, oldValue) {
    if (field === "name") {
      return onNameChange(dataObject, key, newValue, oldValue);
    }

    if (["budget"].includes(field) && dataObject.type === "datevAccount") {
      if (
        Number.isNaN(Number(newValue)) ||
        Number(newValue) === Number(oldValue)
      ) {
        return false;
      }

      const catRowsCopy = deepCopy(categoryRows);
      const subcatRowsCopy = deepCopy(subcategoryRows);
      const dtvRowsCopy = deepCopy(datevRows);

      const datevRow = dtvRowsCopy.find((dtv) => dtv.id === dataObject.id);
      const subcategoryRow = subcatRowsCopy.find(
        (subcat) => subcat.id === datevRow.subcategoryId
      );
      const categoryRow = catRowsCopy.find(
        (cat) => cat.id === subcategoryRow.categoryId
      );

      const timestamp = key.split("-").reverse()[0];
      const { budgetId } = datevRow.cellData[key];

      if (budgetId) Api.budgets.put({ amount: Math.abs(newValue) }, budgetId);

      for (const row of [datevRow, subcategoryRow, categoryRow]) {
        const cellKey = `${row.type}-${row.id}`;

        const fieldKey = `${cellKey}-${field}-${timestamp}`;

        const newCellValue =
          Number(row.cellData[fieldKey].value) -
          Number(oldValue) +
          Number(newValue);

        row.cellData[fieldKey].value = newCellValue;
        row.cellData[fieldKey].label = round(newCellValue);
      }

      setCategoryRows(catRowsCopy);
      setSubcategoryRows(subcatRowsCopy);
      setDatevRows(dtvRowsCopy);
    }
    return true;
  }

  function onRowOpenToggle(type, key, open) {
    if (type === "category") {
      const rowsCopy = [...categoryRows];
      const rowIndex = rowsCopy.findIndex((row) => row.key === key);
      rowsCopy.splice(rowIndex, 1, { ...rowsCopy[rowIndex], isOpen: open });

      setCategoryRows(rowsCopy);
    } else if (type === "subcategory") {
      const rowsCopy = [...subcategoryRows];
      const rowIndex = rowsCopy.findIndex((row) => row.key === key);
      rowsCopy.splice(rowIndex, 1, { ...rowsCopy[rowIndex], isOpen: open });

      setSubcategoryRows(rowsCopy);
    }
  }

  function getCellData(cellData, onValueChange) {
    const cells = [];
    for (const [index, cell] of cellData.entries()) {
      const key = cell.key || `cell-${index}`;
      const className = cell.className || "";
      const isEditable = cell.isEditable || false;
      const sx = cell.sx || null;

      cells.push(
        <AnTableCell
          key={key}
          className={`an-col an-col-${index + 1} ${className}`}
          isEditable={isEditable}
          sx={sx}
          onValueChange={(newValue, oldValue) =>
            onValueChange(newValue, oldValue, cell.field, key)
          }
          label={cell.label}
        >
          {cell.value}
        </AnTableCell>
      );
    }

    return cells;
  }

  function getRowsJsx(rowData, depth = 0) {
    const rows = [];
    for (const row of rowData) {
      const budgets = Object.values(row.cellData).filter(
        (cell) => cell.field === "budget" || cell.field === "name"
      );

      rows.push(
        <AnTableRow
          {...row}
          toggleOpen={(open) => onRowOpenToggle(row.type, row.key, open)}
          className={`${row.className} row-depth-${depth}`}
        >
          {getCellData(budgets, (newValue, oldValue, field, key) =>
            onCellValueChange(row, key, field, newValue, oldValue)
          )}
        </AnTableRow>
      );

      if (row.hasChildren && row.isOpen) {
        let children = [];
        if (row.type === "category")
          children = subcategoryRows.filter(
            (scat) => scat.categoryId === row.id
          );
        else if (row.type === "subcategory")
          children = datevRows.filter((dtv) => dtv.subcategoryId === row.id);

        rows.push(...getRowsJsx(children, depth + 1));
      }
    }

    return rows;
  }

  function tableJsx() {
    if (isLoading) return "Loading...";
    if (error) return "There was an whoopsie somewhere. Please try again later";

    return <AnTable headers={headers}>{getRowsJsx(categoryRows)}</AnTable>;
  }

  return (
    <>
      <div>
        <MonthRangePicker onChange={setMonthRange} value={monthRange} />
      </div>

      <div id="table-container">{tableJsx()}</div>
    </>
  );
}

export default BudgetTable;
