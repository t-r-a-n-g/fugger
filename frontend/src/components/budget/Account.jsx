import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function Account(props) {
  const { values, setValues, index, accountData, setAccountData } = props;

  // translation i18 next
  const { t } = useTranslation();

  /* --------------------------- HANDLING USER INPUT --------------------------- */

  // state to store user input of account they chose
  const [accountValue, setAccountValue] = useState("");

  // pushing chosen accountValue into overall values array when accountValues changes
  // & slicing account out of available accountData options when it got chosen
  useEffect(() => {
    const vals = values.val;
    vals[index].account = accountValue;
    setValues({ val: vals });

    if (accountData && accountValue) {
      const slicedAccountData = accountData.filter(
        (acc) => acc.id !== accountValue.id
      );
      setAccountData(slicedAccountData);
    }
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
        <TextField {...params} label={t("select-datev-account")} />
      )}
    />
  );
}

Account.propTypes = {
  values: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  setValues: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  accountData: PropTypes.arrayOf.isRequired,
  setAccountData: PropTypes.func.isRequired,
};
