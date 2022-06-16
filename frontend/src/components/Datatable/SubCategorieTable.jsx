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
import AccountsTable from "./AccountsTable";

// To round number on two digits
function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export default function SubCategorieTable(props) {
  const { data, userMonths, filter } = props;
  const [open, setOpen] = React.useState(false);

  // sum all "actual" values for one maincategory
  function sumSubActual(month) {
    let sum = 0;
    data.subcategories.map((subcategories) =>
      subcategories.datev_accounts.map(
        (data) =>
          (sum += data.months.hasOwnProperty(month)
            ? data.months[month].actual
            : 0)
      )
    );
    return round(sum);
  }
  // sum all "budget" values for one maincategory
  function sumSubBudget(month) {
    let sum = 0;
    data.subcategories.map((subcategories) =>
      subcategories.datev_accounts.map(
        (data) =>
          (sum += data.months.hasOwnProperty(month)
            ? data.months[month].budget
            : 0)
      )
    );
    return round(sum);
  }

  return (
    <>
      {
        <>
          <TableCell className="firstColumn">
            <IconButton
              sx={{ ml: "-10px" }}
              aria-label="expand row"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell className="categoryColumn">{data.accountName}</TableCell>
        </>
      }
      {userMonths.map((month) => (
        <>
          <TableCell key={month.id} className="actualColumn" align="center">
            {sumSubActual(month)}
          </TableCell>
          <TableCell key={month.id} className="budgetColumn" align="center">
            {sumSubBudget(month)}
          </TableCell>
          <TableCell key={month.id} className="absoluteColumn" align="center">
            {round(sumSubBudget(month) + sumSubActual(month))}
          </TableCell>
          <TableCell key={month.id} className="percentColumn" align="center">
            {round(
              ((sumSubBudget(month) + sumSubActual(month)) /
                sumSubBudget(month)) *
                100
            )
              ? round(
                  ((sumSubBudget(month) + sumSubActual(month)) /
                    sumSubBudget(month)) *
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
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody sx={{ backgroundColor: "grey.A100" }}>
                {data.subcategories.map((subcategories) => (
                  <AccountsTable
                    key={subcategories.accountName}
                    data={subcategories}
                    userMonths={userMonths}
                    filter={filter}
                  />
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
