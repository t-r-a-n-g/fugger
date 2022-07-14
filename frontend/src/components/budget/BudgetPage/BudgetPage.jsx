import React from "react";

import { Box } from "@mui/material";

import BudgetTable from "./BudgetTable";

export default function BudgetPage() {
  return (
    <Box sx={{ px: 2 }}>
      <BudgetTable />
    </Box>
  );
}
