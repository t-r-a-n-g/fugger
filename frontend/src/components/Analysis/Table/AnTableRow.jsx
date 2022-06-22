import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import Collapse from "@mui/material/Collapse";

import AnTableCell from "./AnTableCell";

import "./style.css";

function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

function getRowCells(row, onNameEdit, onTransferEdit) {
  const cells = [];

  cells.push(
    <AnTableCell
      key={`${row.name}-${row.id}-name`}
      isEditable={row.isEditable}
      onValueChange={(v) => onNameEdit(v, row)}
      className="categoryColumn"
    >
      {row.name}
    </AnTableCell>
  );

  Object.keys(row.monthlyTotal).forEach((month) => {
    const transfer = row.monthlyTotal[month];
    let transferAbs = null;

    if (transfer.type === "S") {
      transferAbs = transfer.budget - transfer.actual;
    } else {
      transferAbs = transfer.actual - transfer.budget;
    }

    let transferPerct = null;
    if (transfer.budget > 0)
      transferPerct = (transferAbs / transfer.budget) * 100;
    else transferPerct = transfer.type === "H" ? 100 : -100;

    let transferColor = null;
    if (transferAbs < 0) transferColor = "error.main";
    else if (transferAbs > 0) transferColor = "success.main";

    cells.push(
      <AnTableCell
        key={`${row.name}-${month}-actual`}
        isEditable={transfer.isEditable}
        onValueChange={(v, pv) =>
          onTransferEdit(v, pv, row, { month, ...transfer }, "actual")
        }
        className="actualColumn"
        sx={{
          color: transfer.type === "H" ? "success.main" : "error.main",
        }}
      >
        {round(transfer.actual)}
      </AnTableCell>
    );

    cells.push(
      <AnTableCell
        key={`${row.name}-${month}-budget`}
        isEditable={transfer.isEditable}
        onValueChange={(v, pv) =>
          onTransferEdit(v, pv, row, { month, ...transfer }, "budget")
        }
        className="budgetColumn"
      >
        {round(transfer.budget)}
      </AnTableCell>
    );

    cells.push(
      <AnTableCell
        key={`${row.name}-${month}-abs`}
        className="absoluteColumn"
        sx={{ color: transferColor }}
      >
        {round(transferAbs)}
      </AnTableCell>
    );

    cells.push(
      <AnTableCell
        key={`${row.name}-${month}-perct`}
        className="percentColumn"
        sx={{ color: transferColor }}
      >
        {round(transferPerct)}%
      </AnTableCell>
    );
  });

  return cells;
}

function AnCollapsibleChildRow(props) {
  const {
    row,
    children,
    depth,
    onNameEdit,
    onTransferEdit,
    isOpen,
    toggleOpen,
  } = props;
  const cells = getRowCells(row, onNameEdit, onTransferEdit);

  let open = row.isOpen;
  if (open === undefined) open = false;
  let childRows = null;

  if (open) {
    childRows = Object.values(children).map((child) =>
      child.children ? (
        <AnCollapsibleChildRow
          row={child}
          isOpen={open}
          toggleOpen={toggleOpen}
          depth={depth + 1}
          onNameEdit={onNameEdit}
          onTransferEdit={onTransferEdit}
        >
          {child.children}
        </AnCollapsibleChildRow>
      ) : (
        <AnTableRow
          row={child}
          isOpen={open}
          key={`${row.id}-${child.id}`}
          depth={depth + 1}
          onNameEdit={onNameEdit}
          onTransferEdit={onTransferEdit}
        />
      )
    );
  }
  return (
    <>
      <TableRow>
        <TableCell
          colSpan={cells.length + 1}
          sx={{ padding: "0", border: "0" }}
        >
          <Collapse in={isOpen}>
            <Table size="small" className={`child-${depth}`}>
              <TableBody>
                <TableRow className={`child-${depth}`}>
                  <TableCell className="firstColumn">
                    <IconButton aria-label="expand row" size="small">
                      <DragIndicatorIcon />
                    </IconButton>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => toggleOpen(row, !open)}
                    >
                      {open ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                  </TableCell>

                  {cells}
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>

      {childRows}
    </>
  );
}

function AnCollapsibleRow(props) {
  const { row, children, onNameEdit, onTransferEdit, toggleOpen } = props;

  const cells = getRowCells(row, onNameEdit, onTransferEdit);

  let open = row.isOpen;
  if (open === undefined) open = false;
  let childRows = null;

  if (open) {
    childRows = Object.values(children).map((child) => (
      <AnCollapsibleChildRow
        row={child}
        isOpen={open}
        toggleOpen={toggleOpen}
        key={`${row.id}-${child.id}`}
        depth={1}
        onNameEdit={onNameEdit}
        onTransferEdit={onTransferEdit}
      >
        {child.children}
      </AnCollapsibleChildRow>
    ));
  }

  return (
    <>
      <TableRow>
        <TableCell className="firstColumn" sx={{ textAlign: "center" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => toggleOpen(row, !open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {cells}
      </TableRow>

      {childRows}
    </>
  );
}

function AnTableRow(props) {
  const { row, depth, onNameEdit, onTransferEdit, isOpen } = props;
  const cells = getRowCells(row, onNameEdit, onTransferEdit);

  return (
    <TableRow>
      <TableCell colSpan={cells.length + 1} sx={{ padding: "0", border: "0" }}>
        <Collapse in={isOpen}>
          <Table size="small" className={`child-${depth}`}>
            <TableBody>
              <TableRow className={`child-${depth}`}>
                <TableCell className="firstColumn">
                  <IconButton aria-label="expand row" size="small">
                    <DragIndicatorIcon />
                  </IconButton>
                </TableCell>
                {cells}
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

export default AnCollapsibleRow;
