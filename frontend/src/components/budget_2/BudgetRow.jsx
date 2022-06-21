import React from "react";
import Account from "@components/budget_2/Account";
import { Stack, Box, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Amount from "./Amount";
import Date from "./Date";

export default function BudgetRow() {
  return (
    <Stack sx={{ marginBottom: 2 }} direction="row" spacing={2}>
      <Account /> <Amount /> <Date />
      <Box>
        <Fab size="small" color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Box>
    </Stack>
  );
}
