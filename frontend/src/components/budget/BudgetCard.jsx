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
import { useTranslation } from "react-i18next";
import Account from "./Account";
import Amount from "./Amount";
import Date from "./Date";

/* -------------------------------------------------------------------------
---------------------------- BUDGET DIALOG COMPONENT ----------------------- 
-------------------------------------------------------------------------- */

function ConfirmationDialogRaw(props) {
  const { onClose, open, savedSuccessfully, setSavedSuccessfully, ...other } =
    props;

  // translation i18 next
  const { t } = useTranslation();

  // creating values state that contains an object for all the user input
  const [values, setValues] = useState({
    val: [{ account: "", amount: "", date: [] }],
  });

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
        const res = await API.datevAccounts.get();
        const accounts = await rename(res.data);
        setAccountData(accounts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [open]);

  /* ---------------------- ADDING AND REMOVING ROWS -------------------------*/

  const addClick = () => {
    setValues({
      val: [...values.val, { account: "", amount: "", date: [] }],
    });
  };

  // by removing a row, also add the chosen datevacc of this row back to available accountData options
  const removeClick = (i) => {
    const vals = [...values.val];

    if (vals[i].account) {
      const readdAccount = vals[i].account;
      const updatedAccountData = accountData;
      updatedAccountData.push(readdAccount);
      updatedAccountData.sort((a, b) => {
        const keyA = a.id;
        const keyB = b.id;
        return keyA - keyB;
      });
      setAccountData(updatedAccountData);
    }

    vals.splice(i, 1);
    setValues({ val: vals });
  };

  /* ---------------------- CANCEL BUDGET EDITING -------------------------*/
  // resetting values to show only one empty row when reopen Budgetbox
  const handleCancel = () => {
    setValues({
      val: [{ account: "", amount: "", date: [] }],
    });
    onClose();
  };

  /* ---------------------- SAVE BUDGET EDITING -------------------------*/

  // reformat values because dates is an array
  const formatValues = () => {
    const finalValues = [];
    values.val.map((budgetObj) =>
      budgetObj.date.map((date) =>
        finalValues.push({
          account: budgetObj.account,
          amount: budgetObj.amount,
          date: date.dateToParse,
        })
      )
    );
    return finalValues;
  };

  // check if input is complete before saving
  const [inputComplete, setInputComplete] = useState(true);

  const valueArrayNested = values.val.map((row) => Object.values(row));
  const valueArray = [];
  valueArrayNested.map((array) => array.map((el) => valueArray.push(el)));

  // save function
  const [errorStatus, setErrorStatus] = useState();

  const handleSave = async () => {
    if (!valueArray.some((el) => el.length === 0)) {
      const finalValuesArray = await formatValues();

      try {
        await API.budgets.post(finalValuesArray);
        setSavedSuccessfully(true);

        // resetting values to show only one empty row when reopen Budgetbox
        setValues({
          val: [{ account: "", amount: "", date: [] }],
        });
        onClose();
      } catch (err) {
        setErrorStatus(err.response.status);
      }
    } else setInputComplete(false);
  };

  // reset inputComplete state when closing box (otherwise error message would stay forever)
  useEffect(() => {
    if (!open) setInputComplete(true);
  }, [open]);

  /* --------------------------------------------------------------------------- */

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "100%", maxHeight: "100vh" } }}
      maxWidth="lg"
      open={open}
      {...other}
    >
      <DialogTitle sx={{ fontWeight: "bold", textAlign: "center" }}>
        {t("plan-budgets")}
      </DialogTitle>
      <DialogContent dividers sx={{ alignContent: "center" }}>
        {values.val.map((el, index) => (
          <Stack
            sx={{ marginBottom: 2 }}
            direction="row"
            spacing={2}
            key={index}
          >
            <Account
              accountData={accountData}
              setAccountData={setAccountData}
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
            {t("error-msg-not-filled-out-fields")}
          </Alert>
        ) : null}
        {errorStatus ? (
          <Alert severity="error" sx={{ marginTop: 2 }}>
            {t("500-error-message")}
          </Alert>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>{t("cancel")}</Button>
        <Button onClick={handleSave}>{t("save")}</Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  savedSuccessfully: PropTypes.bool.isRequired,
  setSavedSuccessfully: PropTypes.func.isRequired,
};

/* ------------------------------------------------------------------------ */
/* ---------------------- COMPLETE BUDGET COMPONENT ----------------------- */

export default function BudgetEditing(props) {
  const { open, setOpen, savedSuccessfully, setSavedSuccessfully } = props;

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
        savedSuccessfully={savedSuccessfully}
        setSavedSuccessfully={setSavedSuccessfully}
      />
    </Box>
  );
}

BudgetEditing.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  savedSuccessfully: PropTypes.bool.isRequired,
  setSavedSuccessfully: PropTypes.func.isRequired,
};
