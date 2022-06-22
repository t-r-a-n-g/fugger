import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// Which dates should be provided? Ask Marcus
const months = [
  { month: "Jan 2018", year: 2018 },
  { month: "Feb 2018", year: 2018 },
  { month: "Mar 2018", year: 2018 },
  { month: "Jan 2019", year: 2019 },
  { month: "Feb 2019", year: 2019 },
  { month: "Mar 2019", year: 2019 },
  { month: "Apr 2019", year: 2019 },
  { month: "Jan 2020", year: 2020 },
  { month: "Feb 2020", year: 2020 },
  { month: "Mar 2020", year: 2020 },
];

export default function Date(props) {
  const { values, setValues, index } = props;

  // state to store user input of dates
  const [dateValue, setDateValue] = useState([]);
  /* console.log("values: ", values); */
  /* console.log("dateValue: ", dateValue); */

  // pushing chosen dates into overall values array when dateValue changes
  useEffect(() => {
    const vals = values.val;
    vals[index].date = dateValue;
    setValues({ val: vals });
  }, [dateValue]);

  return (
    <Autocomplete
      value={values.val[index].date}
      onChange={(event, newValue) => setDateValue(newValue)}
      multiple
      id="dates"
      options={months}
      disableCloseOnSelect
      groupBy={(month) => month.year}
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
      renderInput={(params) => <TextField {...params} label="Select Date(s)" />}
    />
  );
}

Date.propTypes = {
  values: PropTypes.objectOf.isRequired,
  setValues: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};
