"use client";

import React, { useState } from "react";
import { getSocket } from "../socket";
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
	const [query, setModelNumber] = useState("");
	const [isSearchOpen, setIsSearchOpen] = useState(false);
	// Redesign added functions
	const [isOpen, setIsOpen] = useState(false);
	const toggleDropdown = () => setIsOpen(!isOpen);
	const [searchType, setSearchType] = useState("model");
	const [isFilterOpen, setIsFilterOpen] = useState(false);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // Prevent page refresh on form submit
		socket.emit("addToWishlist", { query, searchType });
		socket.emit("getUserItems", { email: "zrcoffey@mun.ca" });
		setModelNumber("");
		setIsSearchOpen(false);
		console.log("Form submitted with query and type:", query, searchType);
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
    <nav className="flex flex-wrap justify-between items-center p-4 bg-white border-b w-full">
      {/* Left side with dropdown menu */}
      <div className="relative">
        {/* Menu Icon */}
        <button
          onClick={toggleDropdown}
          className="flex items-center p-2 text-2xl text-dark hover:text-dark2 focus:outline-none"
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
              <FontAwesomeIcon icon={faUser} className="mr-2 text-primary" />
              Profile
            </a>
            <a
              href="/groceries"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faBasketShopping}
                className="mr-2 text-primary"
              />
              Groceries
            </a>
            <a
              href="/tech"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon
                icon={faMicrochip}
                className="mr-2 text-primary"
              />
              Technology
            </a>
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              <FontAwesomeIcon icon={faGear} className="mr-2 text-primary" />
              Settings
            </a>
          </div>
        )}
      </div>

      {/* Centered Bargain Buddy Logo */}
      <div className="flex flex-auto justify-center">
        <span className="text-primary font-bold text-2xl md:text-3xl font-serif">
          Bargain
        </span>
        <span className="text-secondary font-bold text-2xl md:text-3xl font-serif">
          Buddy
        </span>
      </div>
      {/* Right Side: Search with Filter */}
      <div className="relative flex items-center h-auto space-x-4 w-full md:w-auto mt-4 md:mt-0 justify-center md:flex-nowrap z-10 overflow-visible">
        {isSearchOpen && (
          <form
            id="searchForm"
            onSubmit={handleSubmit}
            className="relative flex items-center border rounded-full px-4 py-2 w-80 h-10 overflow-visible md:mr-2"
          >
            
            {/* Search Input */}
            <div className="flex items-center w-72 h-10">
              <input
                type="text"
                value={query}
                onChange={(e) => setModelNumber(e.target.value)}
                className="flex-grow outline-none text-left text-black px-4 py-2 h-9 rounded-l-full"
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
          </form>
        )}

        {/* Search Button with Animation */}
        <button
          type="button"
          className={`bg-dark text-white rounded-xl px-6 py-2 hover:bg-dark transition-all duration-300`}
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
                  {/* Dropdown Menu for Filter Options */}
                  {isFilterOpen && (
              <div className=" absolute flex flex-col top-14 right-20 mt-2 w-48 bg-white rounded-lg shadow-lg z-50">
                <ul className="py-2">
                  <li
                    className="flex flex-row items-center text-dark px-4 py-2 cursor-pointer hover:bg-gray-100 z-50"
                    onClick={() => handleSearchTypeSelect("model")}
                  >
                    <FontAwesomeIcon
                      icon={searchType === "model" ? faCheckCircle : faCircle}
                      className={`mr-2 ${
                        searchType === "model"
                          ? "text-dark"
                          : "text-white text-bold border rounded-full border-dark"
                      }`}
                    />
                    Model Number
                  </li>
                  <li
                    className="flex items-center text-dark px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSearchTypeSelect("product")}
                  >
                    <FontAwesomeIcon
                      icon={
                        searchType === "product" ? faCheckCircle : faCircle
                      }
                      className={`mr-2 ${
                        searchType === "product"
                          ? "text-dark"
                          : "text-white text-bold border rounded-full border-dark"
                      }`}
                    />
                    Product Name
                  </li>
                </ul>
              </div>
            )}
    </nav>
  );
}
