import PropTypes from "prop-types";
import React from "react";

export const Config = React.createContext();

function reducer(state, action) {
  switch (action.type) {
    case "DETAIL_SCREEN_JUMBO_OPEN":
      return Object.assign({}, state, { detailJumboTronOpened: true });
    case "DETAIL_SCREEN_JUMBO_CLOSE":
      return Object.assign({}, state, { detailJumboTronOpened: false });
  }

  return state;
}

export const useConfig = (initialConfig) => {
  const [store, dispatch] = React.useReducer(reducer, initialConfig);

  const Element = function ConfigProvider({ children }) {
    return React.createElement(
      Config.Provider,
      {
        value: [store, dispatch],
      },
      children
    );
  };

  Element.propTypes = {
    children: PropTypes.node,
  };

  return Element;
};
