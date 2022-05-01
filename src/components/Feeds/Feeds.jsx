/* eslint-disable react/prop-types */
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useAuth } from "../../hooks";
import Button from "../Button/Button";
import Model from "../Model/Model";

// Tomorrow is test
// For Social Science @2:00 [Online Mode],
// Video will enabled
// TimeLimit: 2hr

// eslint-disable-next-line react/prop-types
const NotifyPanel = ({ data }) => {
  const [text, setText] = React.useState("");
  const auth = useAuth();

  console.log({ data, auth });

  return (
    <section className="w-80 max-w-sm">
      <h1 className="font-bold  text-2xl">Create Notification</h1>
      <hr />

      <form className="form mt-3 w-full">
        <div className="form-group w-full">
          <label htmlFor="NotificationTitle" className="form-label cursor-pointer">
            Title
          </label>

          <textarea
            className="form-control w-full"
            placeholder="Tomorrow is test"
            type="text"
            name="title"
            id="NotificationTitle"
            autoComplete="off"
            autoSave="off"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-3">
          <Button onClick={(e) => e.preventDefault()}>Submit</Button>
        </div>
      </form>
    </section>
  );
};

const NotifyComponent = ({ data }) => {
  const [isNotifyPanelOpen, setIsNotifyPanelOpen] = React.useState(false);
  return (
    <>
      {isNotifyPanelOpen && (
        <Model onClose={() => setIsNotifyPanelOpen(false)}>
          <NotifyPanel data={data} />
        </Model>
      )}

      <div className="text-right">
        <Button onClick={() => setIsNotifyPanelOpen(true)}>
          <FontAwesomeIcon icon={faBell} /> Notify
        </Button>
      </div>
    </>
  );
};

const Feeds = ({ data }) => {
  const auth = useAuth();
  const isAdmin = data.data.admin.userID === auth.user.userID;
  console.log({ isAdmin });
  return <section className="mt-3">{isAdmin && <NotifyComponent data={data} />}</section>;
};

export default Feeds;
