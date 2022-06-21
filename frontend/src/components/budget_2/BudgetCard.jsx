import React, { useState } from "react";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { /* Alert,  */ Stack, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Account from "@components/budget_2/Account";
import Amount from "./Amount";
import Date from "./Date";

/* ---------------------------- BUDGET DIALOG COMPONENT ----------------------- */

function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;

  // cancel just closes the box without sending any data to backend
  const handleCancel = () => {
    onClose();
  };

  // check if everything is filled out before saving
  // TO DO: on save add an POST request to send the data to backend
  const handleSave = () => {
    onClose();
  };

  /* ---------------------- ADDING AND REMOVING ROWS -------------------------*/
  // creating values state that contains an object for the different value types
  const [values, setValues] = useState({
    val: [{ account: "test account", amount: "", date: [] }],
  });

  // addClick function to add more rows: adding elements to values.val array
  const addClick = () => {
    setValues({
      val: [...values.val, { account: "test add", amount: "", date: [] }],
    });
  };

  // removeClick function to remove rows: slicing elements out of array
  const removeClick = (i) => {
    const vals = [...values.val];
    vals.splice(i, 1);
    setValues({ val: vals });
  };
  /* --------------------------------------------------------------------------- */

  // test for setting values of account
  const [accountValue, setAccountValue] = useState(["testarray"]);
  console.warn("accountValue in BudgetCard: ", accountValue);

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
        {values.val.map((el, index) => (
          <Stack sx={{ marginBottom: 2 }} direction="row" spacing={2}>
            <Account
              valueLabel={el.account}
              setAccountValue={setAccountValue}
            />{" "}
            <Amount />
            <Date />
            <Box>
              <Fab
                size="small"
                color="primary"
                aria-label="add"
                onClick={() => removeClick(index)}
              >
                <RemoveIcon />
              </Fab>
            </Box>
          </Stack>
        ))}

        <Box>
          <Fab size="small" color="primary" aria-label="add" onClick={addClick}>
            <AddIcon />
          </Fab>
        </Box>
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
