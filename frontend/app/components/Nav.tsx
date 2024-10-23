"use client";

import React, { useState } from "react";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const socket = io("http://localhost:3001");

export default function Nav() {
	const [modelNumber, setModelNumber] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	const [isHovered, setIsHovered] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent page refresh on form submit

		socket.emit("addToWishlist", { modelNumber });

		setModelNumber("");
		setIsSearchOpen(false);
	};

	const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen);

	return (
		<nav className="flex justify-between items-center p-4 bg-white border-b w-full">
			{/* Bargain Buddy Logo */}
			<div className="text-lime-800 text-2xl md:text-3xl font-['Newsreader']">Bargain Buddy</div>
			{/* Navigation Links + Search Button */}
			<div className="flex items-center space-x-4 md:space-x-8">
				<a
					href="/profile"
					className={`text-lime-800 font-serif p-2 rounded transition-all duration-500 ${isHovered ? "bg-lime-800 text-white" : ""}`}
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
					style={{ display: "inline-block", width: "100px", textAlign: "center" }} // Adjust width as needed
				>
					<div className="transition-all duration-300">{isHovered ? <FontAwesomeIcon icon={faUser} /> : "Profile"}</div>
				</a>
				<a href="/groceries" className="text-lime-800 font-['Newsreader'] hover:underline">
					Groceries
				</a>
				<a href="/tech" className="text-lime-800 font-['Newsreader'] hover:underline">
					Technology
				</a>
				<a href="/settings" className="text-lime-800 font-['Newsreader'] hover:underline">
					Settings
				</a>

				{/* Search Bar */}
				{isSearchOpen && (
					<form
						onSubmit={handleSubmit}
						className="flex items-center"
						style={{ width: "calc(100% - 200px)" }} // Dynamic width between Search button and Settings
					>
						<input type="text" value={modelNumber} onChange={(e) => setModelNumber(e.target.value)} className="flex-1 px-4 py-2 border rounded-lg" placeholder="Paste model number here..." />
					</form>
				)}

				{/* Search Button */}
				<button className="bg-lime-800 text-white px-2 py-1 md:px-4 md:py-2 rounded" onClick={handleSearchToggle}>
					Search
				</button>
			</div>
		</nav>
	);
}
