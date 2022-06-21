import React from "react";
import TextField from "@mui/material/TextField";

// TO DO: restrict input field to only 2 decimals and run validation check
export default function Amount() {
  return (
    <TextField
      /* value={valueAmount} */
      id="outlined-basic"
      label="EUR"
      variant="outlined"
      type="number"
      inputProps={{ min: "0.00", step: "0.01" }}
      /* onChange={(e) => setValueAmount(e.target.value)} */
    />
  );
}
