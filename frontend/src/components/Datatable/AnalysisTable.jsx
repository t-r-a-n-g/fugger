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

/* -------------------------------------- */
/* STORE RESPONSE Json FROM DB IN VARIABLE */
/* -------------------------------------- */
const response = TestData;

// console.log(response.data.map((main) => main.accountName));

export default function AnalysisTable() {
  return (
    <TableContainer className={Paper}>
      <Table  aria-label="collapsible table">
        <TableHead >
          <TableRow align="center">
            <TableCell className="firstColumn" />
            <TableCell className="categorieColumn" />
            {/* ----------------------------------------------------------------------- */}
            {/* MAPS OVER HEADER FROM RESPONSE JSON TO CREATE COLUMNS IN TABLE BY MONTH */}
            {/* ----------------------------------------------------------------------- */}
            {Object.keys(response.headers).map((month) => (
              <>
                <TableCell />
                <TableCell align="center">{month}</TableCell>
                <TableCell />
                <TableCell />
              </>
            ))}
          </TableRow>
          <TableRow>
            <TableCell className="firstColumn" />
            <TableCell sx={{width:"1000px"}} className="categorieColumn">Categorie</TableCell>
            {/* ----------------------------------------------------------------- */}
            {/* MAPS OVER HEADER FROM RESPONSE JSON TO CREATE SUBCOLUMNS IN TABLE */}
            {/* ----------------------------------------------------------------- */}
            {Object.keys(response.headers).map(() => (
              <>
                <TableCell className="actualColumn" align="center">
                  Actual
                </TableCell>
                <TableCell className="budgetColumn" align="center">
                  Budget
                </TableCell>
                <TableCell className="absoluteColumn" align="center">
                  Abs
                </TableCell>
                <TableCell className="percentColumn" align="center">
                  %
                </TableCell>
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
