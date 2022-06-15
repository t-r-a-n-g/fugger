import * as React from "react";
// import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styleTable.css";

// To round number on two digits
function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export default function AccountsTable(props) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);

  // sum all "actual" values for one subcategory
  function sumAccActual() {
    let sum = 0;
    data.datev_accounts.map(
      (data) =>
        (sum += data.months.hasOwnProperty("Jan2019")
          ? data.months.Jan2019.actual
          : 0)
    );
    return sum;
  }

  // sum all "budget" values for one subcategory
  function sumAccBudget() {
    let sum = 0;
    data.datev_accounts.map(
      (data) =>
        (sum += data.months.hasOwnProperty("Jan2019")
          ? data.months.Jan2019.budget
          : 0)
    );
    return sum;
  }

  // stores values of sum functions in variables and make some calculation for absolute and percent fields
  const actualSub = sumAccActual();
  const budgetSub = sumAccBudget();
  const absoluteSub = round(budgetSub + actualSub);
  const percentSub = round((absoluteSub / budgetSub) * 100);

  const cellStyle = {
    maxWidth: "150px",
    whiteSpace: "nowrap",
    // whiteSpace: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
  };

  return (
    <>
      <TableRow>
        <TableCell className="firstColumn" align="center">
          <IconButton sx={{mr:"-30px"}} aria-label="expand row" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="categoryColumn">{data.accountName}</TableCell>
        <TableCell className="actualColumn" align="center">
          {actualSub}
        </TableCell>
        <TableCell className="budgetColumn" align="center">
          {budgetSub}
        </TableCell>
        <TableCell className="absoluteColumn" align="center">
          {absoluteSub}
        </TableCell>
        <TableCell className="percentColumn" align="center">
          {percentSub ? percentSub : 0}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: "0", border: "0" }} colSpan={6}>
          <Collapse in={open} timeout="auto">
            <Table size="small" aria-label="purchases">
              <TableBody>
                {data.datev_accounts.map((data) => (
                  <TableRow>
                    <TableCell className="firstColumn" />
                    <TableCell
                      key={data.accountName}
                      className="categoryColumn"
                    >
                      {data.accountName}
                    </TableCell>
                    <TableCell className="actualColumn" align="center">
                      {data.months.hasOwnProperty("Jan2019")
                        ? data.months.Jan2019.actual
                        : 0}
                    </TableCell>
                    <TableCell className="budgetColumn" align="center">
                      {data.months.hasOwnProperty("Jan2019")
                        ? data.months.Jan2019.budget
                        : 0}
                    </TableCell>
                    <TableCell className="absoluteColumn" align="center">
                      {(data.months.hasOwnProperty("Jan2019")
                        ? data.months.Jan2019.actual
                        : 0) -
                        (data.months.hasOwnProperty("Jan2019")
                          ? data.months.Jan2019.budget
                          : 0)}
                    </TableCell>
                    <TableCell className="percentColumn" align="center">
                      {round(
                        ((data.months.hasOwnProperty("Jan2019")
                          ? data.months.Jan2019.actual
                          : 0) -
                          (data.months.hasOwnProperty("Jan2019")
                            ? data.months.Jan2019.budget
                            : 0)) /
                          (data.months.hasOwnProperty("Jan2019")
                            ? data.months.Jan2019.budget
                            : 1)
                      ) * 100}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

// SubCategories.propTypes = {
//   row: PropTypes.shape({
//     actual: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     budget: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   }).isRequired,
// };
