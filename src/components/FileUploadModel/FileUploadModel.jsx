import React from "react";
import Button from "../Button/Button";
import Model from "../Model/Model";

// eslint-disable-next-line react/prop-types
const FileUploadModel = ({ closeHandler, onFile, onSubmit }) => {
  // const [files, setFiles] = React.useState([]);
  return (
    <Model onClose={closeHandler}>
      <section className="w-96 max-w-screen-sm">
        <h1 className="mb-2">Upload File</h1>
        <hr />

        <form className="form mt-3">
          <label className="form-label" htmlFor="resourse-upload">
            Select File To Upload
          </label>
          <input
            className="form-control mb-3"
            type="file"
            name="resourse"
            id="resourse-upload"
            onChange={(e) => {
              console.log(e);
              if (onFile && typeof onFile === "function") onFile(e.target.files[0]);
            }}
          />

          <Button onClick={(e) => onSubmit(e)}>Upload</Button>
        </form>
      </section>
    </Model>
  );
};

export default FileUploadModel;
