import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material";
import UserContext from "@contexts/UserContext";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// specify here which dates should be available (yearStart and yearEnd)
const yearStart = 2016;
const yearEnd = 2022;
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const dates = [];

// creating dates array based on specified year range
for (let i = yearStart; i <= yearEnd; i++) {
  for (let j = 1; j <= 12; j++) {
    for (let m = 0; m < months.length; m++) {
      j = months[m];
      dates.push({ year: i, month: `${j} ${i}`, dateToParse: `${j} / ${i}` });
    }
  }
}

export default function Date(props) {
  const { values, setValues, index } = props;

  // translation i18 next
  const { t } = useTranslation();

  // state to store user input of dates
  const [dateValue, setDateValue] = useState([]);

  // pushing chosen dates into overall values array when dateValue changes
  useEffect(() => {
    const vals = values.val;
    vals[index].date = dateValue;
    setValues({ val: vals });
  }, [dateValue]);

  // user | usedTheme | CssTextField are used for styling reasons of DatePicker TextField
  const user = React.useContext(UserContext);
  const usedTheme = user.theme;
  const CssAutocomplete = styled(Autocomplete)(({ theme }) => ({
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

  return (
    <CssAutocomplete
      value={values.val[index].date}
      onChange={(event, newValue) => setDateValue(newValue)}
      multiple
      id="dates"
      options={dates}
      disableCloseOnSelect
      groupBy={(date) => date.year}
      getOptionLabel={(date) => date.month}
      // eslint-disable-next-line
      renderOption={(props, months, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {months.month}
        </li>
      )}
      style={{ width: 550 }}
      renderInput={(params) => (
        <TextField
          sx={{
            svg: { color: "text.secondary" },
          }}
          {...params}
          label={t("select-date")}
        />
      )}
    />
  );
}

Date.propTypes = {
  values: PropTypes.objectOf(PropTypes.arrayOf).isRequired,
  setValues: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
