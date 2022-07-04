import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";

export default function Account(props) {
  const { values, setValues, index, accountData } = props;

  /* --------------------------- HANDLING USER INPUT --------------------------- */

  // state to store user input of account they chose
  const [accountValue, setAccountValue] = useState("");

  // pushing chosen accountValue into overall values array when accountValues changes
  useEffect(() => {
    const vals = values.val;
    vals[index].account = accountValue;
    setValues({ val: vals });
  }, [accountValue]);

  /* ---------------------------------------------------------------------------- */

  if (!accountData) return "Loading accounts ...";

  return (
    <Autocomplete
      value={values.val[index].account}
      onChange={(event, newValue) => setAccountValue(newValue)}
      id="accounts-dropdown"
      options={accountData}
      sx={{ width: 400 }}
      size="medium"
      renderInput={(params) => (
        <TextField {...params} label="Select Datev Account" />
      )}
    />
  );
}

Account.propTypes = {
  values: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  setValues: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
