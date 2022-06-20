import React from "react";
import PropTypes from "prop-types";

import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

function AnTableHead(props) {
  const { months, monthHeaders } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell colSpan={2} align="center" />
        {months.map((m) => (
          <TableCell key={m.key} colSpan={4} align="center">
            {new Date(m.date).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </TableCell>
        ))}
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell>Account</TableCell>

        {months.map((m) =>
          monthHeaders.map((h) => (
            <TableCell key={`${m.key}-${h}`}>{h}</TableCell>
          ))
        )}
      </TableRow>
    </TableHead>
  );
}

AnTableHead.propTypes = {
  months: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    transfers: PropTypes.arrayOf({
      id: PropTypes.number.isRequired,
      actual: PropTypes.number.isRequired,
      budget: PropTypes.number.isRequired,
      datevAccountId: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,

  monthHeaders: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AnTableHead;
