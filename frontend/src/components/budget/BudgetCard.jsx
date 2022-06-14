import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Stack } from "@mui/material";
import Accounts from "./AccountsDropDown";
import AmountInput from "./AmountInput";
import Dates from "./Date";

function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;

  const handleCancel = () => {
    onClose();
  };

  // rewrite the save function to store all the data in array or object or whatever
  const handleSave = () => {
    onClose();
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
        <Stack direction="row" spacing={2}>
          {/* Accounts Dropdown */}
          <Accounts />
          {/* Amount Input Field */}
          <AmountInput />
          {/* Dates Checkbox Multiselect */}
          <Dates />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function ConfirmationDialog() {
  const [open, setOpen] = useState(true);

  const handleClose = (/* newValue */) => {
    setOpen(false);

    /* if (newValue) {
      setValue(newValue);
    } */
  };

  return (
    // make the bg color transparent so analysis table is still visible
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
