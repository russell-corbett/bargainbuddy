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
  faBars,
  faFilter,
  faCheckCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

const socket = getSocket();

export default function Nav() {
  const [modelNumber, setModelNumber] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  // Redesign added functions
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const [searchType, setSearchType] = useState("model");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
      (
        document.getElementById("searchForm") as HTMLFormElement
      )?.requestSubmit();
    } else {
      // If search bar is closed, open it
      setIsSearchOpen(true);
    }
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleSearchTypeSelect = (type: string) => {
    setSearchType(type);
    setIsFilterOpen(false); // Close dropdown once selected
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b w-full">
      {/* Left side with dropdown menu */}
      <div className="relative">
        {/* Menu Icon */}
        <button
          onClick={toggleDropdown}
          className="flex items-center p-2 text-2xl text-lime-800 hover:text-lime-700 focus:outline-none"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* Dropdown Items */}
        {isOpen && (
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faUser} className="mr-2 text-lime-800" />
              Profile
            </a>
            <a
              href="/groceries"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faBasketShopping}
                className="mr-2 text-lime-800"
              />
              Groceries
            </a>
            <a
              href="/tech"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faMicrochip}
                className="mr-2 text-lime-800"
              />
              Technology
            </a>
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faGear} className="mr-2 text-lime-800" />
              Settings
            </a>
          </div>
        )}
      </div>

      {/* Centered Bargain Buddy Logo */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-lime-800 text-2xl md:text-3xl font-serif">
          Bargain Buddy
        </span>
      </div>

      {/* Right Side: Search with Filter */}
      <div className="flex items-center space-x-4 md:space-x-8">
        {isSearchOpen && (
          <form
            id="searchForm"
            onSubmit={handleSubmit}
            className="relative flex items-center border rounded-full px-4 py-2 w-80 h-10 overflow-visible"
          >
            <div className="relative flex items-center w-72 h-10">
              {/* Search Input */}
              <input
                type="text"
                value={modelNumber}
                onChange={(e) => setModelNumber(e.target.value)}
                className=" flex-grow outline-none text-left text-black px-4 py-2 h-9 w-full rounded-l-full"
                placeholder={
                  searchType === "model"
                    ? "Search by Model Number..."
                    : "Search by Product Name..."
                }
              />

              {/* Filter Icon Inside the Search Bar */}
              <button
                type="button"
                onClick={handleFilterClick}
                className="absolute right-0 text-lime-700 px-3 focus:outline-none"
              >
                <FontAwesomeIcon icon={faFilter} />
              </button>
            </div>

            {/* Dropdown Menu for Filter Options */}
            {isFilterOpen && (
              <div className="absolute top-10 right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-30">
                <ul className="py-2">
                  <li
                    className="flex items-center text-lime-800 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchTypeSelect("model")}
                  >
                    <FontAwesomeIcon
                      icon={
                        searchType === "model"
                          ? faCheckCircle
                          : faCircle
                      }
                      className={`mr-2 ${
                        searchType === "model"
                          ? "text-lime-800"
                          : "text-white text-bold border rounded-full border-lime-800"
                      }`}
                    />
                    Model Number
                  </li>
                  <li
                    className="flex items-center text-lime-800 px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchTypeSelect("product")}
                  >
                    <FontAwesomeIcon
                      icon={
                        searchType === "product"
                          ? faCheckCircle
                          : faCircle
                      }
                      className={`mr-2 ${
                        searchType === "product"
                          ? "text-lime-800"
                          : "text-white text-bold border rounded-full border-lime-800"
                      }`}
                    />
                    Product Name
                  </li>
                </ul>
              </div>
            )}
          </form>
        )}

        {/* Search Button with Animation */}
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
