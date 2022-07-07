import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

export default function SuccessErrorBox({ resStatus, setResStatus }) {
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (resStatus) setOpen(true);
  }, [resStatus]);

  const handleClose = () => {
    setOpen(false);
    setResStatus();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
          {t("file-upload")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            {resStatus === 200 ? (
              <Alert severity="success" sx={{ fontSize: 16, marginTop: 2 }}>
                {t("upload-success")}
              </Alert>
            ) : null}
            {resStatus === 400 ? (
              <Alert sx={{ fontSize: 16, marginTop: 2 }} severity="error">
                {t("upload-fail")}
              </Alert>
            ) : null}
            {resStatus === 500 ? (
              <Alert severity="error" sx={{ fontSize: 16, marginTop: 2 }}>
                {t("500-error-message")}
              </Alert>
            ) : null}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {t("close")}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

/* eslint react/require-default-props: 0 */
SuccessErrorBox.propTypes = {
  resStatus: PropTypes.number,
  setResStatus: PropTypes.func,
};
