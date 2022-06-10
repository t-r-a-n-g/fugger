import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import PropTypes from "prop-types";

function FileUploader({ onSuccess }) {
  const [files, setFiles] = useState([]);
  const onInputChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    for (let i = 0; i < files.length; i += 1) {
      data.append("file", files[i]);
    }

    axios
      .post("//localhost:8000/upload", data)
      .then((response) => {
        toast.success("Upload Success");
        onSuccess(response.data);
      })
      .catch(() => {
        toast.error("Upload Error");
      });
  };

  return (
    <form method="post" action="#" id="#" onSubmit={onSubmit}>
      <div className="form-group files">
        <div>Upload Your File</div>
        <input
          type="file"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          onChange={onInputChange}
          className="form-control"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
FileUploader.defaultProps = {
  onSuccess: PropTypes.func,
};
FileUploader.propTypes = {
  onSuccess: PropTypes.func,
};

export default FileUploader;
