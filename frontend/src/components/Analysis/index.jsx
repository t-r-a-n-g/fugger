import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import BudgetEditing from "@components/budget/BudgetCard";

import API from "@services/Api";
import SuccessModal from "@components/budget/SuccessModel";
import AnTable from "./Table/AnTable";

function Analysis() {
  const [isLoading, setIsLoading] = useState(true);
  const [financeData, setFinanceData] = useState(null);

  const [open, setOpen] = useState(false);
  const [savedSuccessfully, setSavedSuccessfully] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await API.get("analysis", {
        from: "Jan/2019",
        to: "Dez/2019",
      });
      setFinanceData(res.data);
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (financeData === null) setIsLoading(true);
    else setIsLoading(false);
  }, [financeData]);

  if (isLoading) return "Loading data...";

  return (
    <>
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
      <AnTable data={financeData} />
    </>
  );
}

export default Analysis;
