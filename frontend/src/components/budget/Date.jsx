import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

// TO DO: use npm package react month picker? https://www.npmjs.com/package/react-month-picker

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

export default function Dates(props) {
  const { dateSelected, setDateSelected } = props;

  // state for value that user chooses (move this up to parent component)
  const [valueDate, setValueDate] = useState("");
  /*  console.log("dates: ", valueDate); */

  // check if user chose at least one date
  useEffect(() => {
    if (valueDate) {
      setDateSelected(true);
    }
    if (valueDate.length === 0) {
      setDateSelected(false);
    }
  }, [valueDate]);

  console.warn("Date selected: ", dateSelected);

  return (
    <Autocomplete
      onChange={(event, newValue) => setValueDate(newValue)}
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

Dates.propTypes = {
  dateSelected: PropTypes.bool.isRequired,
  setDateSelected: PropTypes.func.isRequired,
};
