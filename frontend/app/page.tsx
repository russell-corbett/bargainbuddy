"use client";
import { useEffect, useState } from "react";
import { getSocket } from "./socket";
import LandingPage from "./home/page";

export default function Home() {
	const [isConnected, setIsConnected] = useState<boolean>(false);
	const [transport, setTransport] = useState<string>("N/A");
	// const [modelNumber, setModelNumber] = useState<number>(0);

	useEffect(() => {
		const socket = getSocket();

		function onConnect() {
			setIsConnected(true);
			setTransport(socket.io.engine.transport.name);
			socket.io.engine.on("upgrade", (transport: any) => {
				setTransport(transport.name);
			});

			// socket.emit("modelNumber", (data: number) => {
			//   setModelNumber(data);
			// });
		}

		function onDisconnect() {
			setIsConnected(false);
			setTransport("N/A");
		}

		socket.on("connect", onConnect);
		socket.on("disconnect", onDisconnect);

		// return () => {
		//   socket.off("connect", onConnect);
		//   socket.off("disconnect", onDisconnect);
		// };
	}, []);

	return (
		<div>
			{/* Landing Page Section */}
			<LandingPage />

			{/* Socket Status Section */}
			<div className="p-8">
				<h1 className="text-4xl font-semibold">Bargain Buddy</h1>
				<p>Status: {isConnected ? "Connected" : "Disconnected"}</p>
				<p>Transport: {transport}</p>
				{/* <p>Model Number: {modelNumber}</p> */}
			</div>
		</div>
	);
}
