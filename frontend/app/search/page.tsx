"use client";

import React, { useState } from 'react';

export default function Search() {
  const [isSearchOpen, setIsSearchOpen] = useState(false); // Toggle state for search input
  const [searchValue, setSearchValue] = useState(''); // Track search input value
  const [recentSearches, setRecentSearches] = useState<string[]>([]); // List to store recent searches

  const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen); // Toggle the input display

  // Function to handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Update the state with input value
  };

  // Function to handle search submission
  const handleSearchSubmit = () => {
    if (searchValue.trim() === '') return; // Do nothing if search value is empty

    const updatedSearches = [searchValue, ...recentSearches].slice(0, 5); // Add search to the beginning and keep the list to 5 items max
    setRecentSearches(updatedSearches); // Update the state
    setSearchValue(''); // Clear the search input
  };

  return (
    <div className="SearchPage w-full h-full relative bg-white p-4">
      {/* Search header */}
      <div className="SearchProducts w-full h-8 mt-10 text-lime-800 text-5xl font-normal font-['Inter'] text-center">
        Search Products
      </div>

      {/* Search bar area */}
      <div className="SearchBar w-full h-12 mt-10 flex justify-center">
        {!isSearchOpen ? (
          <button
            className="Rectangle4 w-96 h-12 bg-white rounded-3xl border border-zinc-400 text-left pl-4 text-gray-500"
            onClick={handleSearchToggle}
          >
            Search
          </button>
        ) : (
          <div className="w-96 flex items-center">
            <input
              type="text"
              className="w-full h-12 px-4 rounded-3xl border border-zinc-400 text-gray-900"
              placeholder="Type here to search..."
              value={searchValue}
              onChange={handleInputChange}
              autoFocus
            />
            <button
              onClick={handleSearchSubmit} // Trigger submission on button click
              className="ml-2 bg-lime-800 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        )}
      </div>

      {/* Top Searches Header */}
      <div className="TopSearches w-full h-10 mt-52 text-center">
        <span className="text-lime-800 text-3xl font-normal font-['Inter']">Top</span>
        <span className="text-black text-3xl font-normal font-['Inter']"> </span>
        <span className="text-lime-800 text-3xl font-normal font-['Inter']">Searches</span>
      </div>

      {/* Line separator */}
      <div className="Line2 w-full h-px mt-4 mb-8 border border-neutral-400"></div>

      {/* Products display with recent searches, moved to the bottom */}
      <div className="Frame5 mt-auto flex justify-self-start gap-20 justify-center pb-10">
        {recentSearches.map((search, index) => (
          <div key={index} className="SearchFrame w-80 h-96 relative bg-stone-50 rounded-3xl border-2 border-neutral-200">
            {/* Search Term */}
            <div className="SearchTerm left-[24px] top-[220px] absolute text-black text-xl font-semibold font-['Inter'] leading-relaxed">
              {search}
            </div>
            {/* Original Product Info */}
            <div className="OrganicGinger left-[24px] top-[256px] absolute text-black text-xl font-semibold font-['Inter'] leading-relaxed">
              Organic ginger
            </div>
            <div className="1299Lb left-[24px] top-[286px] absolute text-lime-800 text-xl font-semibold font-['Inter'] leading-relaxed">
              $12.99 / lb
            </div>
            <div className="GrownInHuntingtonBeachCa left-[24px] top-[328px] absolute text-neutral-500 text-base font-normal font-['Inter'] leading-normal">
              Grown in Huntington Beach, CA
            </div>
            {/* Product Image */}
            <img className="K80FkphulvMUnsplash1 w-80 h-56 left-0 top-0 absolute" src="https://via.placeholder.com/323x232" alt="Ginger" />
          </div>
        ))}

        {/* Fill in empty frames if less than 5 searches */}
        {Array.from({ length: 5 - recentSearches.length }).map((_, index) => (
          <div key={index + recentSearches.length} className="Ginger w-80 h-96 relative bg-stone-50 rounded-3xl border-2 border-neutral-200">
            <div className="OrganicGinger left-[24px] top-[256px] absolute text-black text-xl font-semibold font-['Inter'] leading-relaxed">
              Organic ginger
            </div>
            <div className="1299Lb left-[24px] top-[286px] absolute text-lime-800 text-xl font-semibold font-['Inter'] leading-relaxed">
              $12.99 / lb
            </div>
            <div className="GrownInHuntingtonBeachCa left-[24px] top-[328px] absolute text-neutral-500 text-base font-normal font-['Inter'] leading-normal">
              Grown in Huntington Beach, CA
            </div>
            <img className="K80FkphulvMUnsplash1 w-80 h-56 left-0 top-0 absolute" src="https://via.placeholder.com/323x232" alt="Ginger" />
          </div>
        ))}
      </div>
    </div>
  );
}
