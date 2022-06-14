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
  var m = Number((Math.abs(num) * 100).toPrecision(15));
  return Math.round(m) / 100 * Math.sign(num);
}

export default function AccountsTable(props) {
  const { row } = props;
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
            {open ? (
              <KeyboardArrowUpIcon sx={{ paddingLeft: "15px" }} />
            ) : (
              <KeyboardArrowDownIcon sx={{ paddingLeft: "15px" }} />
            )}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Typography variant="body2" sx={{ paddingLeft: "30px" }}>
            {row.name}
          </Typography>
        </TableCell>
        <TableCell align="center">{row.actual}</TableCell>
        <TableCell align="center">{row.budget}</TableCell>
        <TableCell align="center">{row.carbs}</TableCell>
        <TableCell align="center">{row.protein}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table size="small" aria-label="purchases">
              <TableBody>
                <TableBody>
                  <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
                    {accounts.map((row) => (
                      <TableRow>
                        <TableCell />
                        <TableCell component="th" scope="row">
                          <Typography
                            variant="body2"
                            sx={{ paddingLeft: "60px" }}
                          >
                            {row.name}
                          </Typography>
                        </TableCell>
                        <TableCell align="center">{row.actual}</TableCell>
                        <TableCell align="center">{row.budget}</TableCell>
                        <TableCell align="center">{row.actual-row.budget}</TableCell>
                        <TableCell align="center">{round((row.actual-row.budget)/row.budget*100)}</TableCell>
                      </TableRow>
                    ))}
                  </TableRow>
                </TableBody>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};


const accounts = [
  createData("Acc 1", 1000, 1100),
  createData("Acc 2", 2000, 1800),
  createData("Acc 3", 3000, 3200),
  createData("Acc 4", 4000, 5000),
  createData("Acc 5", 5000, 4050),
];


// SubCategories.propTypes = {
//   row: PropTypes.shape({
//     actual: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     budget: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
//   }).isRequired,
// };
