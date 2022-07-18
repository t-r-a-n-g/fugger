import React from "react";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { AnTableHeadProps } from "./propTypes";

function getHeaderRowCells(rowCells) {
  const cells = [];

  for (const [index, cell] of rowCells.entries()) {
    let sx = {
      backgroundColor: "table.header.backgroundColor",
      color: "table.header.fontColor",
      borderBottom: 0,
    };
    let className = `an-header-col-${index + 1}`;

    if (typeof cell === "string") {
      cells.push(
        <TableCell className={className} key={`${cell}-${index}`} sx={sx}>
          {cell}
        </TableCell>
      );
    } else {
      const value = cell.value ?? "";
      className = `${className} ${cell.className}`;

      let key = cell.key ?? `${cell.value}-${index}`;
      if (!key) key = `nk-${index}-${Math.random()}`;

      let colSpan = 1;
      if (cell.colSpan) colSpan = cell.colSpan;

      let align = "left";
      if (cell.align) align = cell.align;

      if (cell.sx) sx = { ...sx, ...cell.sx };

      cells.push(
        <TableCell
          className={`${className}`}
          key={key}
          colSpan={colSpan}
          align={align}
          sx={sx}
        >
          <span>{value}</span>
        </TableCell>
      );
    }
  }

  return cells;
}

function AnTableHead(props) {
  const { headers } = props;
  const rows = [];
  for (const [index, row] of headers.entries()) {
    rows.push(
      <TableRow key={`row-${index}`}>{getHeaderRowCells(row)}</TableRow>
    );
  }

  return <TableHead key="table-head">{rows}</TableHead>;
}

AnTableHead.propTypes = AnTableHeadProps;

export default AnTableHead;
