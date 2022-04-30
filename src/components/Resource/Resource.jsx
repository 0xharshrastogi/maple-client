import React from "react";
import { getAllResourceFiles } from "../../api/server/classroom";
import { useAsync } from "../../hooks/useAsync";
import Button from "../Button/Button";
import ResourseUpload from "../Chat/ResourseUpload";

// eslint-disable-next-line react/prop-types
const Resource = ({ classID }) => {
  const [isFileUploadModelOpen, setIsFileUploadModelOpen] = React.useState(false);
  const { data, loading, error } = useAsync(() => getAllResourceFiles(classID), []);
  if (loading || !data) {
    return <h1>Loading ............</h1>;
  }

  if (error) {
    return <h1>Error {error.message}</h1>;
  }

  const { files } = data;

  return (
    <>
      {isFileUploadModelOpen && (
        <ResourseUpload handleClose={() => setIsFileUploadModelOpen(false)} />
      )}

      <div className="mt-3 text-right">
        <Button onClick={() => setIsFileUploadModelOpen(true)}>Upload</Button>
      </div>

      <table className="table mt-3">
        <thead className="text-red-600 font-extrabold">
          <tr>
            <td>FileName</td>
            <td>Download Link</td>
          </tr>
        </thead>
        <tbody>
          {files.map((data) => {
            return (
              <tr key={data.path}>
                <td>{data.filename}</td>
                <td>
                  <a
                    className="text-blue-500 underline"
                    href={`http://localhost:8080/v1/class/${classID}/resource/download/${data.path}`}
                  >
                    Download
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Resource;
