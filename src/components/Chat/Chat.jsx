import React from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { useAuth } from "../../hooks/useAuth";
import Button from "../Button/Button";
import "./Chat.css";

// const sampleMessage = [
//   { from: "other", text: "Hello Brother", name: "Vinayak" },
//   { from: "me", text: "Nothing", name: "Harsh" },
//   { from: "other", text: "Do you have notes", name: "Akash" },
//   { from: "me", text: "Yes which one", name: "Harsh" },
//   { from: "other", text: "I'm working on this", name: "Vinayak" },
//   { from: "other", text: "I'm working on this", name: "Vinayak" },
//   { from: "other", text: "I'm working on this", name: "Vinayak" },
//   { from: "other", text: "Hello Brother", name: "Vinayak" },
//   { from: "me", text: "Nothing", name: "Harsh" },
//   { from: "other", text: "Do you have notes", name: "Akash" },
//   { from: "me", text: "Yes which one", name: "Harsh" },
//   { from: "other", text: "I'm working on we", name: "Vinayak" },
//   { from: "other", text: "I'm working on this", name: "Vinayak" },
//   { from: "other", text: "I'm working on this", name: "Vinayak" },
// ];

const useChatSocket = () => {
  const { classID } = useParams();
  const auth = useAuth();
  const socket = React.useMemo(() => {
    return io.connect("http://localhost:8080/chat-server");
  }, []);

  const { user } = auth;

  React.useEffect(() => {
    socket.emit("join classroom", { classID, userID: user.userID });

    socket.on("joined classroom data", (data) => console.log(data));
  }, [classID, socket, user.userID]);

  const sendMessage = React.useCallback(
    (message) => {
      socket.emit("forward message", { classID, message });
    },
    [socket, classID]
  );

  const chat = React.useMemo(() => ({ sendMessage }), [sendMessage]);

  React.useEffect(() => {
    socket.on("recieve message", ({ message }) => {
      if (chat.onRecieve && typeof chat.onRecieve === "function") {
        chat.onRecieve(message);
      }
    });
  }, [chat, socket]);

  return chat;
};

const Chat = () => {
  const [text, setText] = React.useState("");
  const [messages, setMessages] = React.useState([]);
  const messageRef = React.useRef();
  const chat = useChatSocket();

  chat.onRecieve = (message, name) => {
    console.log({ message, name });
    setMessages([...messages, { from: "other", text: message, name: name || "Anonymuus" }]);
  };

  const onSendMessage = (e) => {
    e.preventDefault();
    setMessages([...messages, { from: "me", text, name: "Harsh" }]);
    chat.sendMessage(text);
    // const scrollDistance = messageBox.scrollHeight - messageBox.scrollTop;
    // messageBox.scroll(0, messageBox.scrollHeight);
    setText("");
  };

  React.useLayoutEffect(() => {
    const { current: messageBox } = messageRef;
    messageBox.scroll(0, messageBox.scrollHeight);
  }, [messages]);

  return (
    <section className="w-80 bg-gray-100 p-2 chat-wrapper">
      <h3 className="text-center title">Chats</h3>

      <div ref={messageRef} className="mt-1 px-2 py-1 bg-gray-200 rounded message-box">
        {messages.map((message, i) => {
          const { from, text, name } = message;
          return (
            <div className="message-text" data-message-owner={from} key={name + i}>
              <span className="message-sender">{from === "other" ? name : "You"}</span>
              <span>{text}</span>
            </div>
          );
        })}
      </div>

      <form className="mt-1 form d-flex gap-2 create-message">
        <input
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-control"
          placeholder="Type your doubt"
          autoComplete="off"
        />
        <Button onClick={onSendMessage}>Send</Button>
      </form>
    </section>
  );
};

export default Chat;
