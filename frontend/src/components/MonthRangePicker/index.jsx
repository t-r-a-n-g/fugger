import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import TextField from "@mui/material/TextField";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const languages = {
  "en-US": enLocale,
  "de-DE": deLocale,
};

function MonthRangePicker({ onChange, value }) {
  // internal value
  const [intValue, setIntValue] = useState(value);

  const { t } = useTranslation();

  useEffect(() => {
    onChange(intValue);
  }, [intValue]);

  return (
    <LocalizationProvider
      dateAdapter={AdapterDateFns}
      adapterLocale={languages[i18n.language]}
    >
      <DatePicker
        views={["month", "year"]}
        label={t("from")}
        value={intValue[0]}
        onChange={(newValue) => {
          setIntValue([newValue, intValue[1]]);
        }}
        renderInput={(params) => (
          <TextField sx={{ m: 2 }} {...params} helperText={null} />
        )}
      />
      <DatePicker
        views={["month", "year"]}
        label={t("to")}
        value={intValue[1]}
        onChange={(newValue) => {
          setIntValue([intValue[0], newValue]);
        }}
        renderInput={(params) => (
          <TextField sx={{ m: 2 }} {...params} helperText={null} />
        )}
      />
    </LocalizationProvider>
  );
}

MonthRangePicker.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),
};

MonthRangePicker.defaultProps = {
  onChange: () => {},
  value: [new Date(), new Date()],
};

export default MonthRangePicker;
