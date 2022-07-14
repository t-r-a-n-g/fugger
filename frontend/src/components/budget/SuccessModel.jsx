import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function SuccessModal(props) {
  const { savedSuccessfully, setSavedSuccessfully, fromAnalysisPage } = props;

  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (savedSuccessfully) setOpen(true);
  }, [savedSuccessfully]);

  const handleClose = () => {
    setOpen(false);
    setSavedSuccessfully(false);
  };

  const navigate = useNavigate();
  const handleGoToPage = () => {
    navigate("/budgets");
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title" sx={{ fontWeight: "bold" }}>
          {t("your-budgets-heading")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            <Alert severity="success" sx={{ marginTop: 2 }}>
              {t("save-budgets-success")}
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {fromAnalysisPage ? (
            <Button onClick={handleGoToPage} autoFocus>
              {t("go-to-budget-page")}
            </Button>
          ) : null}
          <Button onClick={handleClose} autoFocus>
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

SuccessModal.propTypes = {
  savedSuccessfully: PropTypes.bool.isRequired,
  setSavedSuccessfully: PropTypes.func.isRequired,
  fromAnalysisPage: PropTypes.bool,
};
