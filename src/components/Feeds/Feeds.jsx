/* eslint-disable react/prop-types */
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useParams } from "react-router-dom";
import {
  createAndPublishNotification,
  getAllNotificationOfClassroom,
} from "../../api/server/notification";
import { useAsync, useAuth } from "../../hooks";
import Button from "../Button/Button";
import Model from "../Model/Model";

// Tomorrow is test
// For Social Science @2:00 [Online Mode],
// Video will enabled
// TimeLimit: 2hr

// eslint-disable-next-line react/prop-types
const NotifyPanel = ({ onPublish }) => {
  const [text, setText] = React.useState("");
  const { classID } = useParams();

  const publishNotification = async () => {
    console.log({ classID });
    const response = await createAndPublishNotification({ classID, title: text });
    console.log(response);
  };

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
          <Button
            onClick={(e) => {
              e.preventDefault();
              publishNotification().then(onPublish);
            }}
          >
            Submit
          </Button>
        </div>
      </form>
    </section>
  );
};

const NotifyComponent = ({ data, onPublish }) => {
  const [isNotifyPanelOpen, setIsNotifyPanelOpen] = React.useState(false);
  return (
    <>
      {isNotifyPanelOpen && (
        <Model onClose={() => setIsNotifyPanelOpen(false)}>
          <NotifyPanel
            onPublish={(...args) => {
              setIsNotifyPanelOpen(false);
              onPublish(args);
            }}
            data={data}
          />
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
  const { classID } = useParams();
  const notification = useAsync(() => getAllNotificationOfClassroom(classID), []);

  console.log(notification);
  const isAdmin = data.data.admin.userID === auth.user.userID;
  return (
    <section className="mt-3">
      {isAdmin && <NotifyComponent data={data} onPublish={() => notification.reload()} />}

      {!notification.data ? (
        "Loading ........"
      ) : (
        <div className="container">
          <section className="row">
            {notification.data.map((notification) => {
              return (
                <div
                  className="shadow rounded col-sm-5 text-gray-800 px-2 py-3 h-30 border m-3"
                  key={notification._id}
                >
                  <pre className="font-sans border-l-4 border-uiRed pl-3 h-full">
                    <span className="text-gray-500 font-light">
                      <small>{new Date(notification.createdAt).toLocaleString()}</small>
                    </span>
                    <p className="font-medium">{notification.title}</p>
                  </pre>
                </div>
              );
            })}
          </section>
        </div>
      )}
    </section>
  );
};

export default Feeds;
