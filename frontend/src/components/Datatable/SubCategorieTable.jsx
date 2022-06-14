import * as React from "react";
// import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styleTable.css";
import AccountsTable from "./AccountTable";

function createData(name, actual, budget, carbs, protein) {
  return {
    name,
    actual,
    budget,
    carbs,
    protein,
  };
}
// To round number on two digits
function round(num) {
  const m = Number((Math.abs(num) * 100).toPrecision(15));
  return (Math.round(m) / 100) * Math.sign(num);
}

export default function SubCategorieTable(props) {
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body2">{data.accountName}</Typography>
        </TableCell>
        <TableCell align="center">{data.actual}</TableCell>
        <TableCell align="center">{data.budget}</TableCell>
        <TableCell align="center">{data.carbs}</TableCell>
        <TableCell align="center">{data.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                {subCategories.map((row) => (
                  <AccountsTable key={row.name} row={row} />
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

const subCategories = [
  createData("Sub 1", 159, 6.0, 24, 4.0, 3.99),
  createData("Sub 2", 237, 9.0, 37, 4.3, 4.99),
  createData("Sub 3", 262, 16.0, 24, 6.0, 3.79),
  createData("Sub 4", 305, 3.7, 67, 4.3, 2.5),
  createData("Sub 5", 356, 16.0, 49, 3.9, 1.5),
];

// SubCategories.propTypes = {
//   row: PropTypes.shape({
//     actual: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     budget: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   }).isRequired,
// };
