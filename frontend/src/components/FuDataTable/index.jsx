// import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
// import TableContainer from "@mui/material/TableContainer";
// import TablePagination from "@mui/material/TablePagination";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import Toolbar from "@mui/material/Toolbar";
// import CheckBox from "@mui/material/Checkbox";

import FuTableHead from "./FuTableHead";
import FuTableBody from "./FuTableBody";

function FuDataTable({ headCells, data }) {
  return (
    <Table>
      <FuTableHead cells={headCells} />
      <FuTableBody headCells={headCells} data={data} />
    </Table>
  );
}

export default FuDataTable;
