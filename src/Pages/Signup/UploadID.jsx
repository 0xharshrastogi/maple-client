import React from "react";
import { useHistory } from "react-router-dom";
import client from "../../api/server/config";
import { Button } from "../../components";
import { useAuth } from "../../hooks/useAuth";

const useFileUpload = ({ onUploading, onUploaded, onError, name }) => {
  const [file, setFile] = React.useState(null);
  const { user } = useAuth();
  const localUri = React.useMemo(() => file && URL.createObjectURL(file), [file]);
  const { userID } = user;
  console.log(user);

  const onFileChange = (e) => setFile(e.target.files[0]);
  const clearFile = () => setFile(null);

  const upload = async () => {
    const data = new FormData();
    data.append(name || "image", file);

    if (onUploading && typeof onUploading === "function") onUploading();

    try {
      const result = await client.post(`/v1/user/${userID}/upload/identity`, data);
      if (onUploaded && typeof onUploaded === "function") onUploaded(result);
    } catch (error) {
      if (onError && typeof onError === "function") onError(error);
    }
  };

  return { onFileChange, localUri, upload, isSelected: !!file, clearFile };
};

const UploadID = () => {
  const history = useHistory();
  const { onFileChange, localUri, upload, isSelected, clearFile } = useFileUpload({
    name: "identityImage",
    onUploaded: () => history.push("/"),
  });

  return (
    <section className="container">
      <form className="mt-3 mt-sm-4 mt=md-5 border rounded p-3 max-w-lg mx-auto">
        <h1 className="text-2xl text-red-600 font-extrabold mb-4">
          Upload your scanned Identity Card
        </h1>

        <div className="mb-3">
          <label className="form-label" htmlFor="imageOfID">
            Identity Image <span className="text-uiRed">*</span>
          </label>

          <input
            className="form-control"
            type="file"
            id="imageOfID"
            accept="image/png, image/jpeg"
            onChange={onFileChange}
          />
        </div>

        <div className="max-h-56 overflow-hidden flex justify-center items-center mb-3">
          {isSelected && <img className="w-full object-cover object-center" src={localUri} />}
        </div>

        {isSelected && (
          <div className="d-flex justify-end space-x-2">
            <Button action="clear" type="secondary" onClick={clearFile}>
              Clear
            </Button>
            <Button
              type="primary"
              onClick={(e) => {
                e.preventDefault();
                upload();
              }}
            >
              Upload
            </Button>
          </div>
        )}
      </form>
    </section>
  );
};

export default UploadID;
