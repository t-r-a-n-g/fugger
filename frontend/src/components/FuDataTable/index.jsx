import React, { useState } from "react";
import Table from "@mui/material/Table";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import BudgetEditing from "@components/budget_2/BudgetCard";
import FuTableHead from "./FuTableHead";
import FuTableBody from "./FuTableBody";

function FuDataTable({ headCells, data }) {
  // state for opening the budget dialog
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        sx={{ borderRadius: "10px" }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Edit budget
      </Button>
      <BudgetEditing open={open} setOpen={setOpen} />
      <Table>
        <FuTableHead cells={headCells} />
        <FuTableBody headCells={headCells} data={data} />
      </Table>
    </>
  );
}

FuDataTable.propTypes = {
  headCells: PropTypes.arrayOf().isRequired,
  data: PropTypes.arrayOf().isRequired,
};

export default FuDataTable;
