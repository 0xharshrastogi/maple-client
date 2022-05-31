import React from "react";
import { enrollToClassroom } from "../../api/server/classroom";
import { useAuth } from "../../hooks";
import Button from "../Button/Button";
import Model from "../Model/Model";

export function JoinClassroomButton() {
  const auth = useAuth();
  const { userID } = auth.user;
  const [formEnabled, setFormEnabled] = React.useState(false);

  return (
    <>
      <button onClick={() => setFormEnabled(true)} className="btn btn-primary">
        Join Classroom
      </button>

      {formEnabled && (
        <Model onClose={() => setFormEnabled(false)}>
          <section className="row">
            <h4>Join Classroom</h4>

            <form className="form mt-2">
              <label htmlFor="classID" className="form-label">
                Enter classroom ID:
              </label>

              <input
                type="text"
                name="classID"
                id="classID"
                placeholder="Enter classID e.g. xy7Ubx"
                className="form-control"
              />
              <div className="mt-2">
                <Button
                  onClick={async (e) => {
                    e.preventDefault();

                    const classID = document.getElementById("classID").value;
                    if (classID === "") {
                      return;
                    }

                    try {
                      const response = await enrollToClassroom({ userID, classID });
                      console.log(response);
                      location.reload();
                    } catch (error) {
                      console.dir(error);
                      switch (error.statusCode) {
                        case 404:
                          alert(`${error.message}: No Classroom Found`);
                          break;
                        default:
                          alert(error.message);
                          break;
                      }
                    }
                  }}
                >
                  Submit
                </Button>
              </div>
            </form>
          </section>
        </Model>
      )}
    </>
  );
}
