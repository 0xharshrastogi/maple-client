import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import Routes from "./containers/routes";
import reducers from "./reducers";

const composeEnhancer =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancer(applyMiddleware(thunk));

const store = createStore(reducers, enhancer);

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
          {/* <ClassroomDashboard classID="61ea7bcf1d384aa23f381baf" /> */}
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
