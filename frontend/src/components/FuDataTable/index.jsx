import Table from "@mui/material/Table";
import PropTypes from "prop-types";

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

FuDataTable.propTypes = {
  headCells: PropTypes.arrayOf().isRequired,
  data: PropTypes.arrayOf().isRequired,
};

export default FuDataTable;
