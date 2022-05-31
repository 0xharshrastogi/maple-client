import React from "react";
import { createClassroom } from "../../api/server/classroom";
import { useAuth } from "../../hooks";
import Button from "../Button/Button";
import Model from "../Model/Model";

export function CreateClassroomButton() {
  const auth = useAuth();
  const { userID } = auth.user;
  const [formEnabled, setFormEnabled] = React.useState(false);

  return (
    <>
      <button onClick={() => setFormEnabled(true)} className="btn btn-primary">
        Create Classroom
      </button>

      {formEnabled && (
        <Model onClose={() => setFormEnabled(false)}>
          <section className="row">
            <h4>Create Classroom</h4>

            <form className="form mt-2">
              <label htmlFor="name" className="form-label">
                Enter new classroom name:
              </label>

              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter New Classroom Name"
                className="form-control"
              />
              <div className="mt-2">
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    const value = document.getElementById("name").value;
                    console.log(value);
                    if (value === "") return;

                    await createClassroom({ userID, data: { name: value } });
                    location.reload();
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
