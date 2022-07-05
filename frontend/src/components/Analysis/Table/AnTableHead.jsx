import React from "react";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import { AnTableHeadProps } from "./propTypes";

function getHeaderRowCells(rowCells) {
  const cells = [];
  for (const [index, cell] of rowCells.entries()) {
    if (typeof cell === "string") {
      cells.push(<TableCell key={`${cell}-${index}`}>{cell}</TableCell>);
    } else {
      const value = cell.value ?? "";
      const className = cell.className ?? "";

      let key = cell.key ?? `${cell.value}-${index}`;
      if (!key) key = `nk-${index}-${Math.random()}`;

      let colSpan = 1;
      if (cell.colSpan) colSpan = cell.colSpan;

      let align = "left";
      if (cell.align) align = cell.align;

      const sx = cell.sx ?? {};

      cells.push(
        <TableCell
          className={className}
          key={key}
          colSpan={colSpan}
          align={align}
          sx={sx}
        >
          {value}
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
