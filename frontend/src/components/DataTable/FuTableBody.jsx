/* eslint-disable */
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckBox from "@mui/material/Checkbox";

import "./FuDataTable.css";
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

function CheckBoxColumn({onClick, id}) {
  return (
    <TableCell key={`checkbox_${id}`}>
      <CheckBox></CheckBox>
    </TableCell>
  )
}

function getColumns(rowData, columnHeaders, columns=[], parent=null) {
  for (const [index, column] of columnHeaders.entries()) {
    let className = null;

    if(!parent) {
      className = (index + 1) % 2 === 0 ? "even" : "uneven";
      column.className = className;
    } else className = parent.className;

    if (column.children) {
      if (column.name) {
        const nestedData = getNestedData(column.name, rowData);
        if (nestedData) {
          getColumns(nestedData, column.children, columns, column);
        }
      } else getColumns(rowData, column.children, columns, column);
    } else {
      const key = parent ? `${parent.id}_${column.id}` : column.id

      columns.push(
        <TableCell key={key} className={className}>
          { rowData[column.name] }
        </TableCell>
      );
    }
  }
  
  return columns;
}

function getRows(rowData, columnHeaders, depth = 0, rows=[], parent=null) {
  for (const row of rowData) {
    let columnData = getColumns(row, columnHeaders);
    const key = parent ? `${row.id}_${parent.id}` : row.id;
    rows.push(
      <TableRow key={key}>
        <CheckBoxColumn key={key} /> 
        {columnData}
      </TableRow>);

    if (row.children) {
      getRows(row.children, columnHeaders, depth + 1, rows, row);
    }
  }

  return rows;
}

function FuTableBody({ headCells, data }) {
  // const rows = getRows(data, headCells);
  // return rows.map((row) => <TableRow>{row}</TableRow>);
  const rows = getRows(data, headCells);
  console.log(rows)
  return (
    <TableBody>
      {
        rows
      }
    </TableBody>
  )
  // return d;
}

export default FuTableBody;
