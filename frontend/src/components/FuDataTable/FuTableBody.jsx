import React, { useState } from "react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";
import FuTableRow from "./FuTableRow";

import { headerShape, dataShape } from "./propTypes";

import "./FuDataTable.css";

function getNestedData(key, data) {
  const keys = key.split(".");
  let val = data;

  for (const k of keys) val = val[k] ? val[k] : null;

  return val;
}

function getColumns(rowData, columnHeaders, columns = [], parent = null) {
  // loop through all columnHeaders to extract the name field which is used as key in the rowData
  for (const column of columnHeaders) {
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

      columns.push(<TableCell key={key}>{rowData[column.name]}</TableCell>);
    }
  }

  return columns;
}

function getRows(rowData, columnHeaders, depth = 0, rows = [], parent = null) {
  // create row objects, that we use as state
  for (const row of rowData) {
    const columnData = getColumns(row, columnHeaders);
    let key = row.id;
    let p = parent;

    // append parent ids to make key unique
    while (p !== null) {
      key = `${parent.id}_${key}`;
      p = p.parent;
    }

    const rowObject = {
      id: row.id,
    };

    rowObject.type = row.type;
    rowObject.key = key;
    rowObject.columns = columnData;
    rowObject.depth = depth;
    rowObject.parent = parent;
    rowObject.children = [];

    // set all child rows to be collapsed by default
    rowObject.isCollapsed = true;
    rowObject.isHidden = parent !== null && parent.isCollapsed;

    rowObject.toggleCollapse = function () {
      this.children.forEach((child) => {
        if (this.isCollapsed) {
          // collapse and hide all children
          child.isCollapsed = true;
          child.isHidden = true;
          child.toggleCollapse();
        } else {
          // make all children visible
          child.isHidden = false;
        }
      });
    };

    if (parent) {
      parent.children.push(rowObject);
    }

    rows.push(rowObject);

    if (row.children) {
      getRows(row.children, columnHeaders, depth + 1, rows, rowObject);
    }
  }

  return rows;
}

function FuTableBody({ headCells, data }) {
  const [rows, setRows] = useState(getRows(data, headCells));

  return (
    <TableBody>
      {rows.map((row) => (
        <FuTableRow
          key={row.key}
          className={`row-${row.depth}`}
          collapsable={row.children.length > 0}
          isCollapsed={row.isCollapsed}
          isHidden={row.isHidden}
          onCollapseClick={() => {
            const i = rows.findIndex((r) => {
              return r.key === row.key;
            });
            rows[i].isCollapsed = !rows[i].isCollapsed;
            rows[i].toggleCollapse();
            setRows([...rows]);
          }}
          id={`${row.type}-${row.id}`}
        >
          {row.columns}
        </FuTableRow>
      ))}
    </TableBody>
  );
}

FuTableBody.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.shape(headerShape)).isRequired,
  data: PropTypes.arrayOf(PropTypes.shape(dataShape)).isRequired,
};

export default FuTableBody;
