import React, { useCallback, useState, useEffect } from "react";
import { Stack, Button, Typography, Container, Alert } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import { useDropzone } from "react-dropzone";
import API from "@services/Api";
import SuccessErrorBox from "./SuccessErrorBox";

export default function Files() {
  const { t } = useTranslation(); // i18next

  const [resStatus, setResStatus] = useState();

  const onDrop = useCallback((acceptedFiles) => {
    const formData = new FormData();
    formData.append("datev_export_file", acceptedFiles[0]);

    API.transfers
      .post(formData)
      .then((response) => setResStatus(response.status))
      .catch((err) => setResStatus(err.response.status));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "Excel files": [".xlsx"],
    },
    multiple: false,
  });

  const Input = styled("input")({
    display: "none",
  });

  // API Request to get Upload History
  const [uploadHistoryData, setUploadHistoryData] = useState([]);
  const [uploadHistoryError, setUploadHistoryError] = useState();

  useEffect(() => {
    API.uploads
      .get()
      .then((response) => {
        setUploadHistoryData(response.data);

        // sort uploads descending based on upload date
        response.data.sort((a, b) => {
          const keyA = a.id;
          const keyB = b.id;
          return keyB - keyA;
        });
      })

      .catch((err) => setUploadHistoryError(err.response.status));
  }, [resStatus]);

  return (
    <Stack spacing={2}>
      <h1>{t("menu-item-files")}</h1>
      <div {...getRootProps({ className: "dropzone" })}>
        <Input {...getInputProps()} />

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
          fullWidth
          variant="outlined"
        >
          <Stack spacing={1} alignItems="center">
            <InsertDriveFileOutlinedIcon sx={{ color: "inherit" }} />
            <Typography color="inherit">{t("drag-drop-browse")}</Typography>
            <Typography color="inherit" variant="caption">
              {t("allowed-file-format")}
            </Typography>
          </Stack>
        </Button>
      </div>
      <SuccessErrorBox resStatus={resStatus} setResStatus={setResStatus} />
      <Container>
        <h3>{t("uploaded-files")}</h3>
        {uploadHistoryData ? (
          <Stack direction="row" spacing="30%">
            <Stack spacing={2}>
              <h4 style={{ marginBottom: 2, marginTop: 2.5 }}>
                {t("filename")}
              </h4>
              {uploadHistoryData.map((file, index) => (
                <p key={index}>{file.org_file_name}</p>
              ))}
            </Stack>

            <Stack spacing={2}>
              <h4 style={{ marginBottom: 2, marginTop: 2.5 }}>
                {t("upload-date")}
              </h4>
              {uploadHistoryData.map((file, index) => (
                <p key={index}>{file.createdAt.substr(0, 10)}</p>
              ))}
            </Stack>
          </Stack>
        ) : (
          <p>Loading ...</p>
        )}
        {uploadHistoryError ? (
          <Alert severity="error" sx={{ fontSize: 16, marginTop: 2 }}>
            {t("500-error-message")}
          </Alert>
        ) : null}
      </Container>
    </Stack>
  );
}
