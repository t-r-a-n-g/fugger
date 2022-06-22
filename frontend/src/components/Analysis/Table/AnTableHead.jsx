import React from "react";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function AnTableHead(props) {
  const { months, monthHeaders } = props;

  return (
    <TableHead>
      <TableRow key="header-row-1">
        <TableCell colSpan={2} align="center" key="header-row-1-cell-1" />
        {months.map((m) => (
          <TableCell key={m.key} colSpan={4} align="center">
            {new Date(m.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </TableCell>
        ))}
      </TableRow>
      <TableRow key="header-row-2">
        <TableCell key="header-row-2-cell-1" />
        <TableCell key="header-row-2-cell-2">Account</TableCell>

        {months.map((m) =>
          monthHeaders.map((h) => (
            <TableCell key={`${m.key}-${h}`}>{h}</TableCell>
          ))
        )}
      </TableRow>
    </TableHead>
  );
}

export default AnTableHead;
