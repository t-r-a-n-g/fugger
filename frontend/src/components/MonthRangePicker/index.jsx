import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import UserContext from "@contexts/UserContext";
import deLocale from "date-fns/locale/de";
import enLocale from "date-fns/locale/en-US";
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material";
import "./MonthRangePicker.css";

const languages = {
  "en-US": enLocale,
  "de-DE": deLocale,
};

function MonthRangePicker({ onChange, value }) {
  // internal value
  const [intValue, setIntValue] = useState(value);
  const { t } = useTranslation();

  // user | usedTheme | CssTextField are used for styling reasons of DatePicker TextField
  const user = React.useContext(UserContext);
  const usedTheme = user.theme;
  const CssTextField = styled(TextField)(({ theme }) => ({
    "& label.Mui-focused": {
      color:
        usedTheme === "themeDark"
          ? theme.palette.text.primary
          : theme.palette.primary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: theme.palette.text.primary,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: theme.palette.text.secondary,
      },
      "&:hover fieldset": {
        borderColor: theme.palette.text.primary,
      },
      "&.Mui-focused fieldset": {
        borderColor:
          usedTheme === "themeDark"
            ? theme.palette.text.primary
            : theme.palette.primary.main,
      },
    },
  }));

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
          <CssTextField
            sx={{
              m: 2,
              svg: { color: "text.secondary" },
            }}
            {...params}
            helperText={null}
          />
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
          <CssTextField
            sx={{ m: 2, svg: { color: "text.secondary" } }}
            {...params}
            helperText={null}
          />
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
