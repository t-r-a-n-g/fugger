import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import UserContext from "@contexts/UserContext";

// TO DO: restrict input field to only 2 decimals and run validation check
export default function Amount(props) {
  const { values, setValues, index } = props;

  // state to store user input of amount
  const [amountValue, setAmountValue] = useState("");

  // pushing amountValue into overall values array when amountValues changes
  useEffect(() => {
    const vals = values.val;
    vals[index].amount = amountValue;
    setValues({ val: vals });
  }, [amountValue]);

  const user = React.useContext(UserContext);
  const usedTheme = user.theme;

  return (
    <TextField
      color={usedTheme === "themeDark" ? "text" : null}
      sx={
        usedTheme === "themeDark"
          ? {
              "& .MuiInputLabel-root": { color: "text.primary" },
              "& .MuiOutlinedInput-root": {
                "& > fieldset": { borderColor: "text.primary" },
              },
            }
          : null
      }
      value={values.val[index].amount}
      id="outlined-basic"
      label="EUR"
      type="number"
      inputProps={{ min: "0.00", step: "0.01" }}
      onChange={(e) => setAmountValue(e.target.value)}
    />
  );
}

Amount.propTypes = {
  values: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  setValues: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
