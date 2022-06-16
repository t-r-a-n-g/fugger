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
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const currentMonth = props.month;

  // sum all "actual" values for one maincategory
  function sumSubActual() {
    let sum = 0;
    data.subcategories.map((subcategories) =>
      subcategories.datev_accounts.map(
        (data) =>
          (sum += data.months.hasOwnProperty(currentMonth)
            ? data.months[currentMonth].actual
            : 0)
      )
    );
    return sum;
  }

  // sum all "budget" values for one maincategory
  function sumSubBudget() {
    let sum = 0;
    data.subcategories.map((subcategories) =>
      subcategories.datev_accounts.map(
        (data) =>
          (sum += data.months.hasOwnProperty(currentMonth)
            ? data.months[currentMonth].budget
            : 0)
      )
    );
    return sum;
  }

  // stores values of sum functions in variables and make some calculation for absolute and percent fields
  const actual = sumSubActual();
  const budget = sumSubBudget();
  const absolute = round(budget + actual);
  const percent = round((absolute / budget) * 100);


  return (
    <>
      <TableRow >
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
        <TableCell className="actualColumn" align="center">
          {actual}
        </TableCell>
        <TableCell className="budgetColumn" align="center">
          {budget}
        </TableCell>
        <TableCell className="absoluteColumn" align="center">
          {absolute}
        </TableCell>
        <TableCell className="percentColumn" align="center">
          {percent ? percent : 0}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ padding: "0", border: "0" }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody sx={{ backgroundColor: "grey.A200" }}>
                {data.subcategories.map((subcategories) => (
                  <AccountsTable
                    key={subcategories.accountName}
                    data={subcategories}
                    month={props.month}
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
