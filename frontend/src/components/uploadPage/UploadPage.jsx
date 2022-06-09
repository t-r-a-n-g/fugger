import * as React from "react";
import { Card, CardContent } from "@mui/material";
import { Title } from "react-admin";
import FileUploader from "@components/fileUploader/FileUploader";
import { ToastContainer } from "react-toastify";
import Preview from "@components/fileUploader/preview/Preview";
import { useState } from "react";

function UploadPage() {
  const [files, setFiles] = useState([]);
  const onSuccess = (savedFiles) => {
    setFiles(savedFiles);
  };
  return (
    <Card>
      <Title title="Upload Page" />
      <CardContent>
        <h1>Upload Page</h1>
        <FileUploader onSuccess={onSuccess} />
        <Preview files={files} />
        <ToastContainer />
      </CardContent>
    </Card>
  );
}

export default UploadPage;
