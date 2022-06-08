import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { IconButton, Stack, styled, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";

const StyledDialog = styled(Dialog)(() => ({
  "& .MuiPaper-root": {
    borderTopLeftRadius: "15px",
    borderTopRightRadius: "15px",
  },
}));

const FileTypeButton = styled(Button)(() => ({
  width: "100px",
  borderRadius: "100px",
}));

export default function ExportDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // HANDLE WICH EXPORT FILE BUTTON IS ACTIVE
  const [active, setActive] = React.useState("excel");

  React.useEffect(() => {
    console.warn(active);
  }, [active]);

  const handleExcel = () => {
    setActive("excel");
  };

  const handleCsv = () => {
    setActive("csv");
  };

  const handlePdf = () => {
    setActive("pdf");
  };

  return (
    <div>
      <Button
        sx={{ width: "25ch", borderRadius: "10px" }}
        variant="contained"
        onClick={handleClickOpen}
      >
        Export
      </Button>
      <StyledDialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        aria-describedby="dialog-description"
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "3ch",
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          }}
          id="dialog-title"
        >
          Export
          <IconButton onClick={handleClose}>
            <CancelIcon sx={{ color: "primary.contrastText" }} />
          </IconButton>
        </DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            height: "5ch",
            paddingLeft: "5ch",
            paddingTop: "3ch",
          }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <DriveFolderUploadIcon fontSize="large" />
            <Typography sx={{ textAlign: "center" }}>file.name.csv</Typography>
          </Stack>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10ch",
          }}
        >
          <Stack
            id="dialog-description"
            direction="row"
            spacing={2}
            sx={{ heigth: "200px" }}
          >
            <FileTypeButton
              variant={active === "excel" ? "contained" : "outlined"}
              onClick={handleExcel}
            >
              Excel
            </FileTypeButton>
            <FileTypeButton
              variant={active === "csv" ? "contained" : "outlined"}
              onClick={handleCsv}
            >
              CSV
            </FileTypeButton>
            <FileTypeButton
              variant={active === "pdf" ? "contained" : "outlined"}
              onClick={handlePdf}
            >
              PDF
            </FileTypeButton>
          </Stack>
        </div>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "10ch",
          }}
        >
          <Button
            sx={{ width: "25ch", borderRadius: "10px" }}
            variant="contained"
            onClick={handleClose}
            autoFocus
          >
            Export
          </Button>
        </DialogActions>
      </StyledDialog>
    </div>
  );
}
