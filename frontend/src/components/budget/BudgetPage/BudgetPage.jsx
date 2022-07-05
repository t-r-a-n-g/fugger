import React, { useState } from "react";
import { Button } from "@mui/material";
import BudgetEditing from "@components/budget/BudgetCard";
import SuccessModal from "@components/budget/SuccessModel";

export default function BudgetPage() {
  const [open, setOpen] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  return (
    <>
      <h1> This will be the Budget Page </h1>
      <Button
        sx={{ borderRadius: "10px", marginBottom: 4 }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        Specify budget
      </Button>
      <SuccessModal
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
      />
      <BudgetEditing
        open={open}
        setOpen={setOpen}
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
      />
    </>
  );
}
