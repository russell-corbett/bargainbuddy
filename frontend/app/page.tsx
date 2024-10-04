"use client";

import { useEffect, useState } from "react";
import { socket } from "../app/socket";

export default function Home() {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [transport, setTransport] = useState<string>("N/A");
  const [modelNumber, setModelNumber] = useState<number>(0);

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      socket.io.engine.on("upgrade", (transport: any) => {
        setTransport(transport.name);
      });

      socket.emit("modelNumber", (data: number) => {
        setModelNumber(data);
      });

      console.log("Hello from the frontend");
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? "connected" : "disconnected"}</p>
      <p>Transport: {transport}</p>
      <p>Model Number: {modelNumber}</p>
    </div>
  );
}
