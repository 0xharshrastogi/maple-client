/* eslint-disable react/prop-types */
import React from "react";
import { io } from "socket.io-client";

class ManageSockets {
  constructor() {
    this.store = new Map();
  }

  add(url) {
    const socket = io(url);
    const Context = React.createContext();

    this.store.set(url, { socket, Context });
    return { socket, Context };
  }

  has(url) {
    return this.store.has(url);
  }

  remove(url) {
    if (!this.has(url)) throw new Error("Unknown Socket url");
    this.store.delete(url);
  }

  get(url) {
    if (!this.has(url)) throw new Error("Unknown Socket url");
    return this.store.get(url);
  }
}

const socketsManager = new ManageSockets();

const useSocket = (url) => {
  if (socketsManager.has(url)) {
    const { Context, socket } = socketsManager.get(url);
    return {
      socket,
      Provider: ({ children }) => <Context.Provider value={socket}>{children}</Context.Provider>,
    };
  }

  const { socket, Context } = socketsManager.add(url);
  return {
    socket,
    Provider: ({ children }) => <Context.Provider value={socket}>{children}</Context.Provider>,
  };
};

export default useSocket;
