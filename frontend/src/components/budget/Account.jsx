import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import API from "@services/Api";

export default function Account(props) {
  const { values, setValues, index } = props;

  /* ---------------------------- FETCHING DATEV ACCOUNTS FROM DB ------------------------ */

  const [accountData, setAccountData] = useState(null);

  // renaming the label to have account number and account name
  /* eslint array-callback-return: 0 */
  function rename(data) {
    data.map((obj) => {
      obj.label = `${obj.number} ${obj.name}`;
    });
    return data;
  }

  // TO DO: specify error handling
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.getDatevAccounts();
        const accounts = await rename(res);
        setAccountData(accounts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

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

  if (!accountData) return "Loading accounts";

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
  values: PropTypes.objectOf().isRequired,
  setValues: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
