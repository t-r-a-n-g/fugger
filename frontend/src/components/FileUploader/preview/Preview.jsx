import React from "react";
import PropTypes from "prop-types";

function Preview({ files }) {
  if (!files.length) {
    return null;
  }

  return files.map((file) => (
    <img
      style={{ maxWidth: "200px" }}
      src={`//localhost:8000/${file.filename}`}
      alt={file.originalname}
    />
  ));
}

Preview.defaultProps = {
  files: PropTypes.arrayOf(PropTypes.string),
};
Preview.propTypes = {
  files: PropTypes.arrayOf(PropTypes.string),
};

export default Preview;
