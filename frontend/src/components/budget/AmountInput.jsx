import React, { useState } from "react";
import TextField from "@mui/material/TextField";

// TO DO: restrict input field to only 2 decimals and run validation check
function AmountInput() {
  // state for value that user enters (move this up to parent component, convert into float)
  const [valueAmount, setValueAmount] = useState();
  console.warn("value amount: ", valueAmount);

  return (
    <TextField
      id="outlined-basic"
      label="EUR"
      variant="outlined"
      type="number"
      inputProps={{ min: "0.00", step: "0.01" }}
      onChange={(e) => setValueAmount(e.target.value)}
    />
  );
}

export default AmountInput;
