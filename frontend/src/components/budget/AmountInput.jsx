import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

// TO DO: restrict input field to only 2 decimals and run validation check
function AmountInput(props) {
  const { setAmountSelected, open } = props;

  // state for value that user enters (move this up to parent component, convert into float)
  const [valueAmount, setValueAmount] = useState("");

  // check if user entered amount in input field
  useEffect(() => {
    if (valueAmount) {
      setAmountSelected(true);
    }
    if (!valueAmount) {
      setAmountSelected(false);
    }
  }, [valueAmount]);

  // reset valueAmount when user closes and reopens budget box
  useEffect(() => {
    if (!open) setValueAmount("");
  }, [open]);

  return (
    <TextField
      value={valueAmount}
      id="outlined-basic"
      label="EUR"
      variant="outlined"
      type="number"
      inputProps={{ min: "0.00", step: "0.01" }}
      onChange={(e) => setValueAmount(e.target.value)}
    />
  );
}

AmountInput.propTypes = {
  setAmountSelected: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default AmountInput;
