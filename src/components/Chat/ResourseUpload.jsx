import React from "react";
import { useParams } from "react-router-dom";
import { uploadStudyResource } from "../../api/server/classroom";
import FileUploadModel from "../FileUploadModel/FileUploadModel";

// eslint-disable-next-line react/prop-types
const ResourseUpload = ({ handleClose }) => {
  const { classID } = useParams();
  const [resourse, setResource] = React.useState(null);

  return (
    <FileUploadModel
      closeHandler={handleClose}
      onFile={(files) => {
        setResource(files);
      }}
      onSubmit={(e) => {
        e.preventDefault();
        if (!resourse) return alert("Please Select File Before Uploading");
        const isAllow = confirm(`Upload ${resourse.name}?`);
        if (!isAllow) return;

        const formdata = new FormData();
        formdata.append("study-resource", resourse);

        uploadStudyResource(classID, formdata);
      }}
    />
  );
};

export default ResourseUpload;
