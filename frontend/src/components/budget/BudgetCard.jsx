import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Alert, Stack /* , Fab  */ } from "@mui/material";
/* import AddIcon from "@mui/icons-material/Add"; */
import Accounts from "./AccountsDropDown";
import AmountInput from "./AmountInput";
import Dates from "./Date";

function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;

  // check if all fields are filled out before save
  const [inputComplete, setInputComplete] = useState(true);
  const [accountSelected, setAccountSelected] = useState(false);
  const [amountSelected, setAmountSelected] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  /* -------------------------------------------------------------------- */
  const [readyForNextRow, setReadyForNextRow] = useState(false);
  const budgetRows = [];

  useEffect(() => {
    if (accountSelected && amountSelected && dateSelected) {
      setReadyForNextRow(true);
    }
  }, [accountSelected, amountSelected, dateSelected]);

  if (readyForNextRow) budgetRows.push(1);
  /* ---------------------------------------------------------------- */

  const handleCancel = () => {
    onClose();
  };

  // check if everything is filled out before saving
  const handleSave = () => {
    if (accountSelected && amountSelected && dateSelected) {
      setInputComplete(true);
      onClose();
    } else setInputComplete(false);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: "100vh" } }}
      maxWidth="lg"
      open={open}
      {...other}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        EDIT YOUR BUDGETS
      </DialogTitle>
      <DialogContent dividers sx={{ alignContent: "center" }}>
        <Stack sx={{ marginBottom: 2 }} direction="row" spacing={2}>
          {/* Accounts Dropdown */}
          <Accounts
            accountSelected={accountSelected}
            setAccountSelected={setAccountSelected}
          />
          {/* Amount Input Field */}
          <AmountInput
            amountSelected={amountSelected}
            setAmountSelected={setAmountSelected}
          />
          {/* Dates Checkbox Multiselect */}
          <Dates
            dateSelected={dateSelected}
            setDateSelected={setDateSelected}
          />
          {/*  <Box>
            <Fab size="small" color="secondary" aria-label="add">
              <AddIcon />
            </Fab>
          </Box> */}
        </Stack>
        {/* maybe this needs to be mapped */}
        {budgetRows.map(() => (
          <Stack sx={{ marginBottom: 2 }} direction="row" spacing={2}>
            {/* Accounts Dropdown */}
            <Accounts
              accountSelected={accountSelected}
              setAccountSelected={setAccountSelected}
            />
            {/* Amount Input Field */}
            <AmountInput
              amountSelected={amountSelected}
              setAmountSelected={setAmountSelected}
            />
            {/* Dates Checkbox Multiselect */}
            <Dates
              dateSelected={dateSelected}
              setDateSelected={setDateSelected}
            />
            {/* <Box>
              <Fab size="small" color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
            </Box> */}
          </Stack>
        ))}

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

export default function BudgetEditing(props) {
  const { open, setOpen } = props;

  const handleClose = (/* newValue */) => {
    setOpen(false);

    /* if (newValue) {
      setValue(newValue);
    } */
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
