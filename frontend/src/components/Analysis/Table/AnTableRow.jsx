import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import PropTypes from "prop-types";

import AnTableCell from "./AnTableCell";
import "./AnalysisTable.css";

function getRowCells(row, onNameEdit, onTransferEdit) {
  const cells = [];

  cells.push(
    <AnTableCell
      key={`${row.name}-${row.id}-name`}
      isEditable={row.isEditable}
      onValueChange={(v) => onNameEdit(v, row)}
    >
      {row.name}
    </AnTableCell>
  );
  Object.keys(row.monthlyTotal).forEach((month) => {
    const transfer = row.monthlyTotal[month];
    cells.push(
      <AnTableCell
        key={`${row.name}-${month}-actual`}
        isEditable={transfer.isEditable}
        onValueChange={(v) =>
          onTransferEdit(v, { key: month, ...transfer }, "actual")
        }
      >
        {transfer.actual}
      </AnTableCell>
    );
    cells.push(
      <AnTableCell
        key={`${row.name}-${month}-budget`}
        isEditable={transfer.isEditable}
        onValueChange={(v) =>
          onTransferEdit(v, { key: month, ...transfer }, "budget")
        }
      >
        {transfer.budget}
      </AnTableCell>
    );
    cells.push(
      <AnTableCell key={`${row.name}-${month}-abs`}>
        {transfer.budget - transfer.actual}
      </AnTableCell>
    );
    cells.push(
      <AnTableCell key={`${row.name}-${month}-perct`}>
        {(transfer.actual / transfer.budget) * 100}
      </AnTableCell>
    );
  });

  return cells;
}

function AnCollapsibleChildRow(props) {
  const { row, children, depth, onNameEdit, onTransferEdit, isOpen } = props;
  const [open, setOpen] = useState(false);
  const cells = getRowCells(row, onNameEdit, onTransferEdit);

  return (
    <>
      <TableRow>
        <TableCell
          colSpan={cells.length + 1}
          sx={{ padding: "0", border: "0" }}
        >
          <Collapse in={isOpen}>
            <Table size="small">
              <TableBody>
                <TableRow className={`child-${depth}`}>
                  <TableCell className="first-cell">
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(!open)}
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
      {Object.values(children).map((child) =>
        child.children ? (
          <AnCollapsibleChildRow
            row={child}
            isOpen={open}
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
      )}
    </>
  );
}

function AnCollapsibleRow(props) {
  const { row, children, onNameEdit, onTransferEdit } = props;
  const [open, setOpen] = useState(false);
  const cells = getRowCells(row, onNameEdit, onTransferEdit);

  return (
    <>
      <TableRow>
        <TableCell className="first-cell">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        {cells}
      </TableRow>

      {Object.values(children).map((child) => (
        <AnCollapsibleChildRow
          row={child}
          isOpen={open}
          key={`${row.id}-${child.id}`}
          depth={1}
          onNameEdit={onNameEdit}
          onTransferEdit={onTransferEdit}
        >
          {child.children}
        </AnCollapsibleChildRow>
      ))}
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
          <Table size="small">
            <TableBody>
              <TableRow className={`child-${depth}`}>
                <TableCell className="first-cell" />
                {cells}
              </TableRow>
            </TableBody>
          </Table>
        </Collapse>
      </TableCell>
    </TableRow>
  );
}

/* eslint-disable react/no-unused-prop-types */
const rowPropTypes = {
  row: PropTypes.objectOf({
    id: PropTypes.number.isRequired,
  }).isRequired,
  onNameEdit: PropTypes.func.isRequired,
  onTransferEdit: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(),
  isOpen: PropTypes.bool,
  depth: PropTypes.number,
};
/* eslint-enable react/no-unused-prop-types */

const rowDefaultProps = {
  isOpen: false,
  children: [],
  depth: 0,
};

AnTableRow.propTypes = rowPropTypes;
AnTableRow.defaultProps = rowDefaultProps;

AnCollapsibleRow.propTypes = rowPropTypes;
AnCollapsibleRow.defaultProps = rowDefaultProps;

AnCollapsibleChildRow.propTypes = rowPropTypes;
AnCollapsibleChildRow.defaultProps = rowDefaultProps;

export default AnCollapsibleRow;
