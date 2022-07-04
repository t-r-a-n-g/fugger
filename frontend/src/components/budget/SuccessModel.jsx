import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function SuccessModal(props) {
  const { savedSuccessfully, setSavedSuccessfully } = props;

  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (savedSuccessfully) setOpen(true);
  }, [savedSuccessfully]);

  const handleClose = () => {
    setOpen(false);
    setSavedSuccessfully(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">DONE</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Your budgets have been successfully saved!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
