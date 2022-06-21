import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Alert, Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Accounts from "./AccountsDropDown";
import AmountInput from "./AmountInput";
import Dates from "./Date";

/* ---------------------------- BUDGET DIALOG COMPONENT ----------------------- */

function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;

  // check if all fields are filled out before save
  const [inputComplete, setInputComplete] = useState(true);
  const [accountSelected, setAccountSelected] = useState(false);
  const [amountSelected, setAmountSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  /* -------------------------------------------------------------------- */
  /* --------------- adding new rows when clicking add icon ------------- */
  const [accountValues, setAccountValues] = useState({ val: [] });

  function createRows() {
    return accountValues.val.map(() => (
      <Stack>
        <Accounts
          accountValues={accountValues}
          setAccountValues={setAccountValues}
        />
      </Stack>
    ));
  }

  // on click add new empty element to value array (will get filled with onChange function later)
  const addClick = () => {
    setAccountValues({ val: [...accountValues.val, ""] });
  };

  /* console.log("accountValues: ", accountValues); */
  /* ---------------------------------------------------------------- */

  // cancel just closes the box without sending any data to backend
  const handleCancel = () => {
    onClose();
  };

  // check if everything is filled out before saving
  // TO DO: on save add an POST request to send the data to backend
  const handleSave = () => {
    if (accountSelected && amountSelected && dateSelected) {
      setInputComplete(true);
      onClose();
    } else setInputComplete(false);
  };

  // reset inputComplete state when closing box (otherwise error message would stay forever)
  useEffect(() => {
    if (!open) setInputComplete(true);
  }, [open]);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: "100vh" } }}
      maxWidth="lg"
      open={open}
      {...other}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        SPECIFY YOUR BUDGETS
      </DialogTitle>
      <DialogContent dividers sx={{ alignContent: "center" }}>
        <Stack sx={{ marginBottom: 2 }} direction="row" spacing={2}>
          {/* Accounts Dropdown */}
          <Accounts
            open={open}
            accountSelected={accountSelected}
            setAccountSelected={setAccountSelected}
          />
          {/* Amount Input Field */}
          <AmountInput
            open={open}
            amountSelected={amountSelected}
            setAmountSelected={setAmountSelected}
          />
          {/* Dates Checkbox Multiselect */}
          <Dates
            open={open}
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
          <Box>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={addClick}
            >
              <AddIcon />
            </Fab>
          </Box>
        </Stack>
        {createRows()}

        {!inputComplete ? (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            Fill out every field before saving.
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

/* ------------------------------------------------------------------------ */
/* ---------------------- COMPLETE BUDGET COMPONENT ----------------------- */

export default function BudgetEditing(props) {
  const { open, setOpen } = props;

  // function that only closes the box (saving is handled above)
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ConfirmationDialogRaw
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
      />
    </Box>
  );
}

BudgetEditing.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
