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
import RemoveIcon from "@mui/icons-material/Remove";
import API from "@services/Api";
import Account from "./Account";
import Amount from "./Amount";
import Date from "./Date";

/* -------------------------------------------------------------------------
---------------------------- BUDGET DIALOG COMPONENT ----------------------- 
-------------------------------------------------------------------------- */

function ConfirmationDialogRaw(props) {
  const { onClose, open, ...other } = props;

  // creating values state that contains an object for all the user input
  const [values, setValues] = useState({
    val: [{ account: "", amount: "", date: [] }],
  });

  // CANCEL function
  // resetting values to show only one empty row when reopen Budgetbox
  const handleCancel = () => {
    setValues({
      val: [{ account: "", amount: "", date: [] }],
    });
    onClose();
  };

  // SAVE function
  // TO DO: add POST request to send the data to backend

  // check if input is complete before saving
  const [inputComplete, setInputComplete] = useState(true);

  const valueArrayNested = values.val.map((row) => Object.values(row));
  const valueArray = [];
  valueArrayNested.map((array) => array.map((el) => valueArray.push(el)));

  const handleSave = () => {
    if (!valueArray.some((el) => el.length === 0)) {
      // put the reset function AFTER data was sent to backend
      // resetting values to show only one empty row when reopen Budgetbox
      setValues({
        val: [{ account: "", amount: "", date: [] }],
      });
      onClose();
    } else setInputComplete(false);
  };

  // reset inputComplete state when closing box (otherwise error message would stay forever)
  useEffect(() => {
    if (!open) setInputComplete(true);
  }, [open]);

  /* ---------------------- ADDING AND REMOVING ROWS -------------------------*/

  const addClick = () => {
    setValues({
      val: [...values.val, { account: "", amount: "", date: [] }],
    });
  };

  const removeClick = (i) => {
    const vals = [...values.val];
    vals.splice(i, 1);
    setValues({ val: vals });
  };

  /* -------------- FETCHING DATEV ACCOUNTS FROM DB TO PASS TO ACCOUNT COMPONENT -------------- */

  const [accountData, setAccountData] = useState(null);

  // renaming the label to have account number and account name
  /* eslint array-callback-return: 0 */
  function rename(data) {
    data.map((obj) => {
      obj.label = `${obj.number} ${obj.name}`;
    });
    return data;
  }

  // TO DO: specify error handling
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await API.getDatevAccounts();
        const accounts = await rename(res);
        setAccountData(accounts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, []);

  /* --------------------------------------------------------------------------- */

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
              accountData={accountData}
              values={values}
              setValues={setValues}
              index={index}
            />{" "}
            <Amount values={values} setValues={setValues} index={index} />
            <Date values={values} setValues={setValues} index={index} />
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
