import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

// TO DO: restrict input field to only 2 decimals and run validation check
function AmountInput(props) {
  const { amountSelected, setAmountSelected } = props;

  // state for value that user enters (move this up to parent component, convert into float)
  const [valueAmount, setValueAmount] = useState("");
  /* console.log("value amount: ", valueAmount); */

  // check if user entered amount in input field
  useEffect(() => {
    if (valueAmount) {
      setAmountSelected(true);
    }
    if (!valueAmount) {
      setAmountSelected(false);
    }
  }, [valueAmount]);

  console.warn("Amount selected: ", amountSelected);

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

AmountInput.propTypes = {
  amountSelected: PropTypes.bool.isRequired,
  setAmountSelected: PropTypes.func.isRequired,
};

export default AmountInput;
