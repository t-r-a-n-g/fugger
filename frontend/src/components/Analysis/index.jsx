import React, { useState } from "react";

import { useRecoilState } from "recoil";

import { calculateDiff, round } from "@services/utils/math";

import monthRangeAtom from "@recoil/monthRange";

import useTableData from "@hooks/useTableData";

import MonthRangePicker from "@components/MonthRangePicker";

import Api from "@services/Api";

import ExportTable from "@components/ExportTable";
import BudgetEditing from "@components/budget/BudgetCard";
import SuccessModal from "@components/budget/SuccessModel";

import { Box, Button } from "@mui/material";

import { useTranslation } from "react-i18next";

import AnTable from "./Table/AnTable";
import AnTableRow from "./Table/AnTableRow";
import AnTableCell from "./Table/AnTableCell";

import "./analysisTable.css";

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function AnalysisTable() {
  const { t } = useTranslation();

  /* States for Budget Planning Box and Success Message */
  const [openBudget, setOpenBudget] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);
  const fromAnalysisPage = true;

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
  } = useTableData({ table: "analysis" });

  const [monthRange, setMonthRange] = useRecoilState(
    monthRangeAtom("analysis")
  );

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

  async function onCellValueChange(dataObject, key, field, newValue, oldValue) {
    if (field === "name") {
      return onNameChange(dataObject, key, newValue, oldValue);
    }

    if (
      ["actual", "budget"].includes(field) &&
      dataObject.type === "datevAccount"
    ) {
      if (
        Number.isNaN(Number(newValue)) ||
        Number(newValue) === Number(oldValue)
      ) {
        return false;
      }

      const getFieldColorSx = (val) => {
        val = Number(val);
        if (Number.isNaN(Number(val))) return {};

        let color = "";
        if (val > 0) color = "success.main";
        else if (val < 0) color = "error.main";

        return { color };
      };

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
      const { transferId, budgetId } = datevRow.cellData[key];

      if (field === "actual")
        Api.transfers.put(
          {
            amount: Math.abs(newValue),
            type: Number(newValue) < 0 ? "S" : "H",
          },
          transferId
        );
      else if (field === "budget") {
        if (budgetId) Api.budgets.put({ amount: Math.abs(newValue) }, budgetId);
        else {
          const res = await Api.budgets.post({
            amount: newValue,
            date: timestamp,
            accountId: datevRow.id,
          });

          datevRow.cellData[key].budgetId = res.id;
        }
      }

      for (const row of [datevRow, subcategoryRow, categoryRow]) {
        const cellKey = `${row.type}-${row.id}`;

        const fieldKey = `${cellKey}-${field}-${timestamp}`;

        let newCellValue =
          Number(row.cellData[fieldKey].value) -
          Number(oldValue) +
          Number(newValue);

        if (field === "budget") newCellValue = Math.abs(newCellValue);
        row.cellData[fieldKey].sx = getFieldColorSx(newCellValue);
        row.cellData[fieldKey].value = newCellValue;
        row.cellData[fieldKey].label = round(newCellValue);

        const actualKey = `${cellKey}-actual-${timestamp}`;
        const budgetKey = `${cellKey}-budget-${timestamp}`;

        const absKey = `${cellKey}-abs-${timestamp}`;
        const pctKey = `${cellKey}-pct-${timestamp}`;

        const { abs, pct } = calculateDiff(
          row.cellData[actualKey].value,
          row.cellData[budgetKey].value
        );

        row.cellData[absKey].sx = getFieldColorSx(abs);
        row.cellData[absKey].value = abs;
        row.cellData[absKey].label = round(abs);

        row.cellData[pctKey].sx = getFieldColorSx(pct);
        row.cellData[pctKey].value = pct;
        row.cellData[pctKey].label = round(pct);
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
      const sx = { ...cell.sx } || {};

      if (cell.field === "budget") {
        sx.borderRight = 1;
        sx.borderRightColor = "table.border.thin";
      } else if (cell.field === "actual") {
        sx.borderLeft = 1;
        sx.borderLeftColor = "table.border.thick";
      } else if (cell.field === "pct") {
        sx.borderRight = 1;
        sx.borderRightColor = "table.border.thick";
      }

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
      rows.push(
        <AnTableRow
          {...row}
          toggleOpen={(open) => onRowOpenToggle(row.type, row.key, open)}
          className={`${row.className} row-depth-${depth}`}
        >
          {getCellData(
            Object.values(row.cellData),
            (newValue, oldValue, field, key) =>
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
      <div id="table-functions">
        <div>
          <Button
          sx={{ marginTop: 3, marginLeft: 2 }}
          variant="contained"
          onClick={() => setOpenBudget(true)}
        >
          {t("plan-budgets")}
        </Button>
        </div>
        <div>
          <MonthRangePicker onChange={setMonthRange} value={monthRange} />
        </div>

      </div>

      <SuccessModal
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
        fromAnalysisPage={fromAnalysisPage}
      />
      <BudgetEditing
        open={openBudget}
        setOpen={setOpenBudget}
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
      />

      <Box sx={{ px: 2 }} id="table-container">
        {tableJsx()}
      </Box>
    </>
  );
}

export default AnalysisTable;
