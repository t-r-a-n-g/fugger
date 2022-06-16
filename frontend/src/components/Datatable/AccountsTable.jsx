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
  const { data, userMonths, filter } = props;
  const [open, setOpen] = React.useState(false);

  // sum all "actual" values for one subcategory
  function sumAccActual(month) {
    let sum = 0;
    data.datev_accounts.map(
      (data) =>
        (sum += data.months.hasOwnProperty(month)
          ? data.months[month].actual
          : 0)
    );
    return round(sum);
  }

  // sum all "budget" values for one subcategory
  function sumAccBudget(month) {
    let sum = 0;
    data.datev_accounts.map(
      (data) =>
        (sum += data.months.hasOwnProperty(month)
          ? data.months[month].budget
          : 0)
    );
    return round(sum);
  }

  return (
    <>
      <>
        <TableCell className="firstColumn" align="center">
          <IconButton
            sx={{ mr: "-30px" }}
            aria-label="expand row"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell className="categoryColumn">{data.accountName}</TableCell>
      </>
      {userMonths.map((month) => (
        <>
          <TableCell key={month.id} className="actualColumn" align="center">
            {sumAccActual(month)}
          </TableCell>
          <TableCell key={month.id} className="budgetColumn" align="center">
            {sumAccBudget(month)}
          </TableCell>
          <TableCell key={month.id} className="absoluteColumn" align="center">
            {round(sumAccBudget(month) + sumAccActual(month))}
          </TableCell>
          <TableCell key={month.id} className="percentColumn" align="center">
            {round(
              ((sumAccBudget(month) + sumAccActual(month)) /
                sumAccBudget(month)) *
                100
            )
              ? round(
                  ((sumAccBudget(month) + sumAccActual(month)) /
                    sumAccBudget(month)) *
                    100
                )
              : 0}
          </TableCell>
        </>
      ))}
      <TableRow>
        <TableCell
          sx={{ padding: "0", border: "0" }}
          colSpan={userMonths.length * 4 + 2}
        >
          <Collapse in={open} timeout="auto">
            <Table aria-label="purchases">
              <TableBody sx={{ backgroundColor: "grey.200" }}>
                {data.datev_accounts.map((data) => (
                  <TableRow key={data.accountName}>
                    <TableCell className="firstColumn" />
                    <TableCell
                      key={data.accountName}
                      className="categoryColumn"
                    >
                      {data.accountName}
                    </TableCell>
                    {userMonths.map((month) => (
                      <>
                        <TableCell className="actualColumn" align="center">
                          {data.months.hasOwnProperty(month)
                            ? data.months[month].actual
                            : 0}
                        </TableCell>
                        <TableCell className="budgetColumn" align="center">
                          {data.months.hasOwnProperty(month)
                            ? data.months[month].budget
                            : 0}
                        </TableCell>
                        <TableCell className="absoluteColumn" align="center">
                          {round(
                            (data.months.hasOwnProperty(month)
                              ? data.months[month].budget
                              : 0) +
                              (data.months.hasOwnProperty(month)
                                ? data.months[month].actual
                                : 0)
                          )}
                        </TableCell>
                        <TableCell className="percentColumn" align="center">
                          {round(
                            (((data.months.hasOwnProperty(month)
                              ? data.months[month].budget
                              : 0) +
                              (data.months.hasOwnProperty(month)
                                ? data.months[month].actual
                                : 0)) /
                              (data.months.hasOwnProperty(month)
                                ? data.months[month].budget
                                : 1)) *
                              100
                          )}
                        </TableCell>
                      </>
                    ))}
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
