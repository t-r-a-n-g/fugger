import React from "react";
import { Stack, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useDropzone } from "react-dropzone";

export default function Files() {
  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone();
  const { t } = useTranslation(); // i18next
  const Input = styled("input")({
    display: "none",
  });

  const files = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  return (
    <Stack spacing={2}>
      <h1>{t("menu-item-files")}</h1>
      <div
        {...getRootProps({ className: "dropzone" })}
      >
        <Input
          {...getInputProps()}
        />

        <Button
          sx={
            isDragActive
              ? {
                  height: "25vh",
                  textTransform: "none",
                  border: "2px dashed",
                  backgroundColor: "primary.light",
                  borderColor: "primary.contrast",
                  color: "grey.700",
                }
              : {
                  height: "25vh",
                  textTransform: "none",
                  border: "2px dashed",
                  borderColor: "primary.light",
                  backgroundColor: "primary.thin",
                  color: "text.primary",
                  "&:hover": {
                    border: "2px dashed",
                    backgroundColor: "primary.light",
                    borderColor: "primary.contrast",
                    color: "grey.700",
                  },
                }
          }
          fullWidth={true}
          variant="outlined"
        >
          <Stack spacing={1} alignItems={"center"}>
            <InsertDriveFileOutlinedIcon sx={{ color: "inherit" }} />
            <Typography color="inherit">Drag and Drop, or Browse</Typography>
            <Typography color="inherit" variant="caption">
              Support ZIP and RAR files
            </Typography>
          </Stack>
        </Button>
      </div>
      <h4>Files</h4>
      <ul>{files}</ul>
    </Stack>
  );
}
