import * as React from "react";
// import PropTypes from "prop-types";
// import Collapse from "@mui/material/Collapse";
// import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
// import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "./styleTable.css";
import SubCategorieTable from "./SubCategorieTable";
import TestData from "./TestData.json";

function createData(name, actual, budget, carbs, protein) {
  return {
    name,
    actual,
    budget,
    carbs,
    protein,
  };
}
const mainCategories = [
  createData("Revenue", 159, 6.0, 24, 4.0, 3.99),
  createData("Cost of Goods Sold (COGS)", 237, 9.0, 37, 4.3, 4.99),
  createData("Operating Expenses", 262, 16.0, 24, 6.0, 3.79),
  createData("Extraordinary Result", 305, 3.7, 67, 4.3, 2.5),
  createData("EBITDA", 356, 16.0, 49, 3.9, 1.5),
];

/* -------------------------------------- */
/* STORE RESPONSE Json FROM DB IN VARIABLE */
/* -------------------------------------- */
const response = TestData;

// console.log(response.data.map((main) => main.accountName));

export default function AnalysisTable() {
  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow align="center">
            <TableCell align="center" colSpan={2} />
            {/* ----------------------------------------------------------------------- */}
            {/* MAPS OVER HEADER FROM RESPONSE JSON TO CREATE COLUMNS IN TABLE BY MONTH */}
            {/* ----------------------------------------------------------------------- */}
            {Object.keys(response.headers).map((month) => (
              <TableCell align="center" colSpan={4}>
                {month}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell />
            <TableCell>Categorie</TableCell>
            {/* ----------------------------------------------------------------- */}
            {/* MAPS OVER HEADER FROM RESPONSE JSON TO CREATE SUBCOLUMNS IN TABLE */}
            {/* ----------------------------------------------------------------- */}
            {Object.keys(response.headers).map(() => (
              <>
                <TableCell align="center">Actual</TableCell>
                <TableCell align="center">Budget</TableCell>
                <TableCell align="center">Abs</TableCell>
                <TableCell align="center">%</TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* --------------------------------------------------------------- */}
          {/* MAPS OVER DATA FROM RESPONSE JSON TO CREATE SUBCOLUMNS IN TABLE */}
          {/* --------------------------------------------------------------- */}
          {response.data.map((mainCategories) => (
            <SubCategorieTable
              key={mainCategories.accountName}
              data={mainCategories}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
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
