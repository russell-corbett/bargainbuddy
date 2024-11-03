"use client";

import React, { useState } from "react";
import { getSocket } from "../socket";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faBasketShopping,
  faMicrochip,
  faGear,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

const socket = getSocket();

export default function Nav() {
  const [modelNumber, setModelNumber] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isProfileHovered, setIsProfileHovered] = useState(false);
  const [isGroceriesHovered, setIsGroceriesHovered] = useState(false);
  const [isTechHovered, setIsTechHovered] = useState(false);
  const [isSettingsHovered, setIsSettingsHovered] = useState(false);
  const [isSearchButtonClicked, setIsSearchButtonClicked] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent page refresh on form submit
    socket.emit("addToWishlist", { modelNumber });
    setModelNumber("");
    setIsSearchOpen(false);
    console.log("Form submitted with model number:", modelNumber);
  };

  const handleSearchButtonClick = () => {
    if (isSearchOpen) {
      // If search bar is open, submit the form
      (document.getElementById("searchForm") as HTMLFormElement)?.requestSubmit();
    } else {
      // If search bar is closed, open it
      setIsSearchOpen(true);
    }
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b w-full">
      {/* Bargain Buddy Logo */}
      <div className="text-lime-800 text-2xl md:text-3xl font-serif">
        Bargain Buddy
      </div>
      {/* Navigation Links + Search Button */}
      <div className="flex items-center space-x-4 md:space-x-8">
        <a
          href="/profile"
          className={`text-lime-800 font-serif p-2 rounded transition-all duration-500 ${
            isProfileHovered ? "bg-lime-800 text-white" : ""
          }`}
          onMouseEnter={() => setIsProfileHovered(true)}
          onMouseLeave={() => setIsProfileHovered(false)}
          style={{
            display: "inline-block",
            width: "100px",
            textAlign: "center",
          }} // Adjust width as needed
        >
          <div className="transition-all duration-300">
            {isProfileHovered ? <FontAwesomeIcon icon={faUser} /> : "Profile"}
          </div>
        </a>

        <a
          href="/groceries"
          className={`text-lime-800 font-serif p-2 rounded transition-all duration-500 ${
            isGroceriesHovered ? "bg-lime-800 text-white" : ""
          }`}
          onMouseEnter={() => setIsGroceriesHovered(true)}
          onMouseLeave={() => setIsGroceriesHovered(false)}
          style={{
            display: "inline-block",
            width: "100px",
            textAlign: "center",
          }} // Adjust width as needed
        >
          <div className="transition-all duration-300">
            {isGroceriesHovered ? (
              <FontAwesomeIcon icon={faBasketShopping} />
            ) : (
              "Groceries"
            )}
          </div>
        </a>

        <a
          href="/tech"
          className={`text-lime-800 font-serif p-2 rounded transition-all duration-500 ${
            isTechHovered ? "bg-lime-800 text-white" : ""
          }`}
          onMouseEnter={() => setIsTechHovered(true)}
          onMouseLeave={() => setIsTechHovered(false)}
          style={{
            display: "inline-block",
            width: "100px",
            textAlign: "center",
          }} // Adjust width as needed
        >
          <div className="transition-all duration-300">
            {isTechHovered ? (
              <FontAwesomeIcon icon={faMicrochip} />
            ) : (
              "Technology"
            )}
          </div>
        </a>
        <a
          href="/settings"
          className={`text-lime-800 font-serif p-2 rounded transition-all duration-500 ${
            isSettingsHovered ? "bg-lime-800 text-white" : ""
          }`}
          onMouseEnter={() => setIsSettingsHovered(true)}
          onMouseLeave={() => setIsSettingsHovered(false)}
          style={{
            display: "inline-block",
            width: "100px",
            textAlign: "center",
          }} // Adjust width as needed
        >
          <div className="transition-all duration-300">
            {isSettingsHovered ? <FontAwesomeIcon icon={faGear} /> : "Settings"}
          </div>
        </a>

        {/* Search Bar */}
        {isSearchOpen && (
          <form
            id="searchForm"
            onSubmit={handleSubmit}
            className="flex items-center text-black"
            style={{ width: "calc(100% - 200px)" }}
          >
            <input
              type="text"
              value={modelNumber}
              onChange={(e) => setModelNumber(e.target.value)}
              className="flex-1 px-4 py-2 border rounded-lg animate-typing"
              placeholder="Paste model number here..."
            />
          </form>
        )}

        {/* Search Button */}
        <button
          type="button"
          className={`bg-lime-800 text-white ${
            isSearchOpen ? "rounded-xl px-6 py-2" : "rounded-full w-9 h-9"
          } hover:bg-lime-900 transition-all duration-300`}
          onClick={handleSearchButtonClick}
        >
          <div className="transition-all duration-300">
            {isSearchOpen ? (
              "Search"
            ) : (
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            )}
          </div>
        </button>
      </div>
    </nav>
  );
}
