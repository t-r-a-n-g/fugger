import React from "react";

import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { AnTableRowProps, AnTableRowDefaultProps } from "./propTypes";

function AnTableRow(props) {
  const { toggleOpen, isOpen, isChild, className, hasChildren, sx, children } =
    props;

  let firstCell = null;
  if (isChild && !hasChildren)
    firstCell = <TableCell className="firstColumn" />;
  else if (hasChildren) {
    firstCell = (
      <TableCell
        className="firstColumn"
        sx={{
          backgroundColor: "table.body.backgroundColor",
          textAlign: "center",
          borderBottom: 1,
          borderBottomColor: "table.border.thin",
        }}
      >
        <IconButton
          aria-label="expand row"
          size="small"
          onClick={() => toggleOpen(!isOpen)}
          sx={{
            color: "table.accent",
          }}
        >
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </IconButton>
      </TableCell>
    );
  }

  return (
    <TableRow className={`an-row ${className}`} sx={sx}>
      {firstCell}
      {children}
    </TableRow>
  );
}

AnTableRow.propTypes = AnTableRowProps;
AnTableRow.defaultProps = AnTableRowDefaultProps;

export default AnTableRow;
