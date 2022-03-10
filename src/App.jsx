import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { io } from "socket.io-client";
import Routes from "./containers/routes";
import reducers from "./reducers";

const composeEnhancer =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancer(applyMiddleware(thunk));

const store = createStore(reducers, enhancer);

function App() {
  const socket = io("http://localhost:8080/video-stream");

  socket.on("connect", () => {
    console.log("Succesfully connected to Socket Server");
    socket.emit("@user/new", { userID: 12345 });

    socket.on("ping", console.log);
  });

  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
