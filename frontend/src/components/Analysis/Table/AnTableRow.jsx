import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import AnTableCell from "./AnTableCell";

import { AnTableRowProps, AnTableRowDefaultProps } from "./propTypes";

function getCellData(cellData) {
  const cells = [];
  for (const [index, cell] of cellData.entries()) {
    if (typeof cell !== "object") {
      cells.push(<AnTableCell key={`cell-${index}`}>{cell}</AnTableCell>);
    } else {
      const key = cell.key || `cell-${index}`;
      const className = cell.className || "";
      const isEditable = cell.isEditable || false;
      const sx = cell.sx || null;
      const onValueChange = cell.onValueChange || function () {};

      cells.push(
        <AnTableCell
          key={key}
          className={`an-col an-col-${index + 1} ${className}`}
          isEditable={isEditable}
          sx={sx}
          onValueChange={onValueChange}
        >
          {cell.value}
        </AnTableCell>
      );
    }
  }

  return cells;
}

function AnTableRow(props) {
  const {
    cellData,
    toggleOpen,
    isOpen,
    isChild,
    childRows,
    rowDepth,
    className,
  } = props;

  let { hasChildren } = props;

  if (Array.isArray(childRows) && childRows.length > 0) hasChildren = true;

  const children = [];
  if (hasChildren) {
    for (const child of childRows) {
      children.push(
        <AnTableRow
          cellData={child.cellData}
          toggleOpen={child.toggleOpen}
          isOpen={child.isOpen}
          isChild
          hasChildren={child.hasChildren}
          rowDepth={rowDepth + 1}
          className={`${className} child-row-${rowDepth + 1}`}
          childRows={child.childRows}
          key={child.key}
        />
      );
    }
  }

  let firstCell = null;
  if (isChild && !hasChildren) firstCell = <TableCell />;
  else if (hasChildren) {
    firstCell = (
      <TableCell className="firstColumn" sx={{ textAlign: "center" }}>
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => toggleOpen(!isOpen)}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    );
  }

  const cells = getCellData(cellData);
  return (
    <>
      <TableRow className={className}>
        {firstCell}
        {cells}
      </TableRow>

      {children}
    </>
  );
}

AnTableRow.propTypes = AnTableRowProps;
AnTableRow.defaultProps = AnTableRowDefaultProps;

export default AnTableRow;
