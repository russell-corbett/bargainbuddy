"use client";


import Link from 'next/link';
import React, { useState } from 'react';

export default function Nav() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const handleSearchToggle = () => setIsSearchOpen(!isSearchOpen);

  return (
    <nav className="flex justify-between items-center p-4 bg-white border-b">
      <div className="text-lime-800 text-3xl font-semibold">Bargain Buddy</div>
      <div className="space-x-8">
        <Link href="/profile">My Profile</Link>
        <Link href="/groceries">Groceries</Link>
        <Link href="/tech">Technology</Link>
        <Link href="/settings">Settings</Link>
        <Link href="/search">Search</Link>
      </div>
      <button className="bg-lime-800 text-white px-4 py-2 rounded" onClick={handleSearchToggle}>Search</button>
      {isSearchOpen && (
        <div className="absolute top-0 left-0 w-full bg-gray-100 p-4">
          <form className="flex items-center space-x-4">
            <input
              type="text"
              className="flex-1 px-4 py-2 border rounded-lg"
              placeholder="Paste product link here..."
            />
            <button className="px-4 py-2 bg-lime-800 text-white rounded-lg">
              Add to Wishlist
            </button>
          </form>
        </div>
      )}
    </nav>
  );
}
