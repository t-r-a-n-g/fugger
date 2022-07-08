import React, { useState } from "react";

import { Button } from "@mui/material";

import BudgetEditing from "@components/budget/BudgetCard";
import SuccessModal from "@components/budget/SuccessModel";
import { useTranslation } from "react-i18next";
import ExportTable from "@components/ExportTable";

import BudgetTable from "./BudgetTable";

export default function BudgetPage() {
  const [open, setOpen] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  // translation i18 next
  const { t } = useTranslation();

  return (
    <>
      <h1>Budgets</h1>
      <Button
        sx={{ borderRadius: "10px", marginBottom: 4 }}
        variant="contained"
        onClick={() => setOpen(true)}
      >
        {t("plan-budgets")}
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

      {/* TESTING ONLY */}
      <ExportTable />
    </>
  );
}
