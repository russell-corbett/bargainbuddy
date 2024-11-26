"use client";

import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  if (!socket) {
    socket = io("https://bargainbuddyserver.russellcorbett.ca");
  }

  return socket;
};
