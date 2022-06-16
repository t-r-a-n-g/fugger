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
import "./styleTable.css";
import SubCategorieTable from "./SubCategorieTable";
import TestData from "./TestData.json";

/* -------------------------------------- */
/* STORE RESPONSE Json FROM DB IN VARIABLE */
/* -------------------------------------- */
const response = TestData;
const months = Object.keys(response.headers);

export default function AnalysisTable() {
  return (
    <TableContainer>
      <Table size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell className="firstColumn" />
            <TableCell className="categoryColumn" />
            {/* ----------------------------------------------------------------------- */}
            {/* MAPS OVER HEADER FROM RESPONSE JSON TO CREATE COLUMNS IN TABLE BY MONTH */}
            {/* ----------------------------------------------------------------------- */}
            {months.map((month, index) => (
              <>
                <TableCell
                  key={response.headers + index}
                  colSpan={4}
                  align="center"
                >
                  {month}
                </TableCell>
              </>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className="firstColumn" />
            <TableCell className="categoryColumn">Category</TableCell>
            {/* ----------------------------------------------------------------- */}
            {/* MAPS OVER HEADER FROM RESPONSE JSON TO CREATE SUBCOLUMNS IN TABLE */}
            {/* ----------------------------------------------------------------- */}
            {months.map(() => (
              <>
                <TableCell
                  key={response.headers.id}
                  className="actualColumn"
                  align="center"
                >
                  Actual
                </TableCell>
                <TableCell
                  key={response.headers.id}
                  className="budgetColumn"
                  align="center"
                >
                  Budget
                </TableCell>
                <TableCell
                  key={response.headers.id}
                  className="absoluteColumn"
                  align="center"
                >
                  Abs
                </TableCell>
                <TableCell
                  key={response.headers.id}
                  className="percentColumn"
                  align="center"
                >
                  %
                </TableCell>
              </>
            ))}
          </TableRow>
          {/* --------------------------------------------------------------- */}
          {/* MAPS OVER DATA FROM RESPONSE JSON TO CREATE THE TABLE */}
          {/* --------------------------------------------------------------- */}
          {response.data.map((mainCategories) => (
            <SubCategorieTable
              key={mainCategories.accountName}
              data={mainCategories}
              userMonths={months}
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
