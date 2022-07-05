import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Alert from "@mui/material/Alert";

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
          YOUR BUDGETS
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {" "}
            <Alert severity="success" sx={{ marginTop: 2 }}>
              Your budgets have been successfully saved!
            </Alert>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleGoToPage} autoFocus>
            Go to Budget Page
          </Button>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
