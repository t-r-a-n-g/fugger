/* eslint-disable */
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckBox from "@mui/material/Checkbox";

/* function getColumns(rowData, columnHeaders) {
  return columnHeaders.map((column) => {
    if (column.children) {
      if (Array.isArray(rowData[column.name]))
        return getColumns(rowData[column.name], column.children);
      return getColumns(rowData, column.children);
    }

    const data = rowData[column.name];
    return data ? <TableCell>{data}</TableCell> : <TableCell />;
  });
}

function getRows(data, columnHeaders) {
  const rowData = [];
  data.map((row) => {
    rowData.push(getColumns(row, columnHeaders));
    if (row.children) rowData.push(getRows(row.children, columnHeaders));
  });

  return rowData;
} */

function getNestedData(key, data) {
  const keys = key.split(".");
  let val = data;

  for (const k of keys) val = val[k] ? val[k] : null;

  return val;
}

function getColumns(rowData, columnHeaders) {
  const columns = [];
  for (const column of columnHeaders) {
    let columnData = null;
    if (column.children) {
      if (column.name) {
        const nestedData = getNestedData(column.name, rowData);
        if (nestedData) {
          columnData = getColumns(nestedData, column.children);
        }
      } else columnData = getColumns(rowData, column.children);
    } else {
      columnData = [rowData[column.name]] || [null];
    }

    columns.push(...columnData);
  }

  return columns;
}

function getRows(rowData, columnHeaders, depth = 0) {
  const rows = [];
  for (const row of rowData) {
    let columnData = null;
    if (row.children)
      columnData = getRows(row.children, columnHeaders, depth + 1);
    else {
      columnData = getColumns(row, columnHeaders);
    }

    rows.push(columnData);
  }

  return rows;
}

function FuTableBody({ headCells, data }) {
  // const rows = getRows(data, headCells);
  // return rows.map((row) => <TableRow>{row}</TableRow>);
  const d = getRows(data, headCells);
  return d;
}

export default FuTableBody;
