import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import CheckBox from "@mui/material/Checkbox";
import PropTypes from "prop-types";

import { headerShape, dataShape } from "./propTypes";

import "./FuDataTable.css";

function getNestedData(key, data) {
  const keys = key.split(".");
  let val = data;

  for (const k of keys) val = val[k] ? val[k] : null;

  return val;
}

function CheckBoxColumn({ onChange, id }) {
  return (
    <TableCell key={`checkbox_${id}`} onChange={onChange}>
      <CheckBox />
    </TableCell>
  );
}

function getColumns(rowData, columnHeaders, columns = [], parent = null) {
  // loop through all columnHeaders to extract the name field which is used as key in the rowData
  for (const [index, column] of columnHeaders.entries()) {
    // className for even/uneven columns
    let className = null;

    // since headers are grouped, we only want to count the parent headers
    if (!parent) {
      // index + 1 because columns 0 is checkbox
      className = (index + 1) % 2 === 0 ? "even" : "uneven";
      column.className = className;
    } else className = parent.className;

    // if the column has children (aka is grouped) we call this function again with column.children as headers
    // we add the result to the columns argument since just returning it will create nested arrays
    if (column.children) {
      // resolve the name to get nested data. data objects are seperated by '.'
      if (column.name) {
        const nestedData = getNestedData(column.name, rowData);
        if (nestedData) {
          getColumns(nestedData, column.children, columns, column);
        }
      } else getColumns(rowData, column.children, columns, column);
    } else {
      const key = parent ? `${parent.id}_${column.id}` : column.id;

      columns.push(
        <TableCell key={key} className={className}>
          {rowData[column.name]}
        </TableCell>
      );
    }
  }

  return columns;
}

function getRows(rowData, columnHeaders, depth = 0, rows = [], parent = null) {
  for (const row of rowData) {
    const columnData = getColumns(row, columnHeaders);
    const key = parent ? `${row.id}_${parent.id}` : row.id;
    const className = `row-${depth}`;

    rows.push(
      <TableRow key={key} className={className}>
        <CheckBoxColumn key={key} />
        {columnData}
      </TableRow>
    );

    if (row.children) {
      getRows(row.children, columnHeaders, depth + 1, rows, row);
    }
  }

  return rows;
}

function FuTableBody({ headCells, data }) {
  const rows = getRows(data, headCells);
  return <TableBody>{rows}</TableBody>;
}

CheckBoxColumn.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

CheckBoxColumn.defaultProps = {
  onChange: () => {},
};

FuTableBody.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.shape(headerShape)).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(dataShape)).isRequired,
};

export default FuTableBody;
