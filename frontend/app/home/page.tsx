"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLink,
  faSearch,
  faCartShopping,
  faHandHoldingDollar,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import compareImage from "../storeLogos/comparePrice.jpg";
import priceTrendImage from "../storeLogos/priceTrends.jpg";
import saveMoneyImage from "../storeLogos/saveMoney.jpg";

export default function LandingPage() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Animation duration in ms
      once: true, // Only animate once on scroll
    });
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      {/* Navbar */}
      <nav
        className="flex justify-between items-center p-6 bg-white text-lime-800"
        data-aos="fade-down"
      >
        {/* Left side links */}
        <div className="flex space-x-6">
          <a href="#how-it-works" className="hover:underline">
            How it Works
          </a>
          <a href="#pricing" className="hover:underline">
            Pricing
          </a>
        </div>

        {/* Right side links */}
        <div className="flex space-x-6">
          {/* <button className="bg-white text-lime-800 py-2 px-4 rounded-lg hover:bg-gray-200">
            Register
          </button> */}
          <Link href="/accountSignIn">
            <button className="bg-lime-800 text-white py-2 px-4 rounded-lg hover:scale-105">
              Sign In
            </button>
          </Link>
        </div>
      </nav>

      <section className="flex flex-col items-center justify-center min-h-screen bg-white p-1 mt-40">
        {/* Logo and Text */}
        <div className="flex items-center space-x-4" data-aos="fade-left">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-lime-800 text-5xl"
          />
          <h1
            className="text-4xl  text-lime-800 font-serif"
            data-aos="fade-left"
          >
            Bargain Buddy
          </h1>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-xl mt-8">
          <input
            type="text"
            className="w-full h-12 pl-12 pr-4 border-2 border-lime-800 rounded-full focus:outline-none focus:ring-1 focus:ring-lime-800"
          />
          <span className="absolute right-6 top-6 transform -translate-y-1/2 text-lime-800">
            <FontAwesomeIcon icon={faSearch} className="text-lg" />
          </span>
          {/* <div className="text-gray absolute left-12 top-1/2 transform -translate-y-1/2 typing-placeholder duration-300">
            Type Model Number
          </div> */}

          <div className="flex text-black justify-center font-serif font-bold font-s mt-6 typing-placeholder duration-300">
            Compare top store pirces
          </div>

          {/* Store Icons Section */}
          <div className="flex justify-center space-x-4 mt-8">
            {/* Each store icon */}
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://logodownload.org/wp-content/uploads/2020/05/best-buy-logo.png"
                  alt="Best Buy"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://purepng.com/public/uploads/large/amazon-logo-s3f.png"
                  alt="Amazon"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://1000logos.net/wp-content/uploads/2017/05/Walmart-Logo.png"
                  alt="Walmart"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTP-pb-p3K4YK-hbtPDcoj3j4seP1a0BT_ag&s"
                  alt="Staples"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://download.logo.wine/logo/Sobeys/Sobeys-Logo.wine.png"
                  alt="Sobeys"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://static.wikia.nocookie.net/logopedia/images/2/29/Dominion_Logo.svg/revision/latest?cb=20140729032900"
                  alt="Dominion"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full border-2 border-neutral-200 overflow-hidden hover:scale-105 hover:-translate-y-3 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                <img
                  src="https://download.logo.wine/logo/Costco/Costco-Logo.wine.png"
                  alt="Costco"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Searches Section */}
        <h2 className="text-lime-800 text-2xl font-medium mt-40">
          Top Searches
        </h2>
        <div className="flex gap-8 mt-6">
          {/* Sample Product Cards */}
          <div className="bg-stone-50 w-64 p-4 rounded-3xl border-2 border-neutral-200 shadow-sm">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="w-full h-40 object-contain mb-4 rounded"
            />
            <h3 className="text-black text-xl font-semibold">Product Name</h3>
            <p className="text-lime-800 font-semibold">$$$</p>
            <p className="text-gray-500 text-sm">Model Number</p>
          </div>

          <div className="bg-stone-50 w-64 p-4 rounded-3xl border-2 border-neutral-200 shadow-sm">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="w-full h-40 object-contain mb-4 rounded"
            />
            <h3 className="text-black text-xl font-semibold">Product Name</h3>
            <p className="text-lime-800 font-semibold">$$$</p>
            <p className="text-gray-500 text-sm">Model Number</p>
          </div>

          {/* Repeat for more product cards */}
          <div className="bg-stone-50 w-64 p-4 rounded-3xl border-2 border-neutral-200 shadow-sm">
            <img
              src="https://via.placeholder.com/150"
              alt="Product"
              className="w-full h-40 object-contain mb-4 rounded"
            />
            <h3 className="text-black text-xl font-semibold">Product Name</h3>
            <p className="text-lime-800 font-semibold">$$$</p>
            <p className="text-gray-500 text-sm">Model Number</p>
          </div>

          {/* Add more product cards as needed */}
        </div>
      </section>
      <section className="py-16 px-8 bg-gray-50">
        {/* Title */}
        <h2
          className="font-serif text-center text-4xl font-bold text-lime-800 mb-12"
          data-aos="fade-left"
        >
          Why Bargain Buddy?
        </h2>

        {/* Compare Prices Section - Image on Left */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
          <div className="flex justify-center">
            <Image
              src={compareImage}
              alt="Compare Prices"
              className="w-80 h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lime-800 text-4xl font-bold text-gray-800">
              Compare Prices
            </h3>
            <p className="text-black mt-2">
              Quickly compare prices across multiple stores to ensure you're
              getting the best value for your purchase.
            </p>
          </div>
        </div>

        {/* Track Price History Section - Image on Right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
          <div className="flex flex-col justify-center order-2 md:order-1">
            <h3 className="text-lime-800 text-center sm:text-xl lg:text-4xl font-bold text-gray-800">
              Track Price History
            </h3>
            <p className="text-black mt-2 text-center">
              Monitor the price trends over time so you can buy at the lowest
              price point possible.
            </p>
          </div>
          <div className="flex justify-center order-1 md:order-2">
            <Image
              src={priceTrendImage} // Replace with your image path
              alt="Track Prices"
              className="w-80 h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Save Money Section - Image on Left */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
          <div className="flex justify-center">
            <Image
              src={saveMoneyImage} // Replace with your image path
              alt="Save Money"
              className="w-80 h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="text-lime-800 text-4xl font-bold text-gray-800">
              Save
            </h3>
            <h3 className="text-lime-800 text-4xl font-bold text-gray-800">
              Money
            </h3>
            <p className="text-black mt-2">
              Get the best deals and save money effortlessly by making informed
              shopping decisions.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="p-10 bg-stone-100 text-center">
        <h3 className="text-4xl font-serif text-lime-800 mb-6">How It Works</h3>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-10">
          Discover how BargainBuddy helps you save with our simple three-step
          process.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Step 1 */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-4">
              <FontAwesomeIcon
                icon={faLink}
                className="text-lime-800 text-5xl"
              />
            </div>
            <h4 className="text-xl font-semibold text-lime-800 mb-2">Step 1</h4>
            <p className="text-gray-600 mb-4">
              Paste a product link from any store to start the comparison.
            </p>
            <a href="#step1-details" className="text-lime-800 font-medium">
              Learn More &rarr;
            </a>
          </div>

          {/* Step 2 */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-4">
              <FontAwesomeIcon
                icon={faHandHoldingDollar}
                className="text-lime-800 text-5xl"
              />
            </div>
            <h4 className="text-xl font-semibold text-lime-800 mb-2">Step 2</h4>
            <p className="text-gray-600 mb-4">
              Compare prices and view price history trends.
            </p>
            <a href="#step2-details" className="text-lime-800 font-medium">
              Learn More &rarr;
            </a>
          </div>

          {/* Step 3 */}
          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center">
            <div className="flex items-center space-x-4 mb-4">
              <FontAwesomeIcon
                icon={faBell}
                className="text-lime-800 text-5xl"
              />
            </div>
            <h4 className="text-xl font-semibold text-lime-800 mb-2">Step 3</h4>
            <p className="text-gray-600 mb-4">
              Get notifications when prices drop and save items to your
              wishlist.
            </p>
            <a href="#step3-details" className="text-lime-800 font-medium">
              Learn More &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="p-10 bg-white text-center">
        <h3 className="text-4xl font-serif text-lime-800">Pricing</h3>
        <div className="flex justify-center gap-8 mt-8">
          <div className="w-1/3 bg-stone-50 p-6 rounded-lg shadow-md">
            <h4 className="text-lime-800  text-2xl font-semibold">Free Plan</h4>
            <p className="text-lime-800 mt-2">
              Basic features for occasional deal hunters.
            </p>
            <p className="text-lime-800  text-2xl font-bold mt-4">$0/month</p>
          </div>
          <div className="w-1/3 bg-lime-800 p-6 rounded-lg text-white shadow-md">
            <h4 className="text-2xl font-semibold">Pro Plan</h4>
            <p className="mt-2">
              Advanced features for power users and serious deal hunters.
            </p>
            <p className="text-2xl font-bold mt-4">$9.99/month</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="Footer3 w-full px-5 py-12 bg-stone-50 color-primary flex flex-col justify-start items-center gap-12">
        <div className="Content w-full max-w-6xl flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Left Column */}
          <div className="Column w-full lg:w-1/3 flex flex-col justify-start items-start gap-6">
            <div className="ColorDark flex items-center">
              <div className="LogoWide1 w-30 h-9 relative flex-col justify-start items-start flex text-lime-800 font-serif text-2xl">
                Bargain Buddy
                <span className="text-lime-800 text-2xl font-bold"></span>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-1">
                <div className="Address text-black text-Text-primary text-sm font-semibold leading-tight">
                  Address:
                </div>
                <div className="Level112SampleStSydneyNsw2000 text-black text-Text-primary text-sm font-normal leading-tight">
                  St. John's, Canada
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="Contact text-Text-primary text-sm text-black font-semibold leading-tight">
                  Contact:
                </div>
                <div className="Container flex flex-col">
                  <div className="text-Link-primary text-sm text-black font-normal underline leading-tight">
                    709-123-4567
                  </div>
                  <div className="text-Link-primary text-black text-sm font-normal underline leading-tight">
                    info@bargainbuddy.io
                  </div>
                </div>
              </div>
            </div>
            <div className="SocialLinks flex gap-3">
              <div className="IconFacebook w-6 h-6 flex items-center justify-center">
                📘
              </div>
              <div className="IconInstagram w-6 h-6 flex items-center justify-center">
                📸
              </div>
              <div className="IconX w-6 h-6 flex items-center justify-center">
                X
              </div>
              <div className="IconLinkedin w-6 h-6 flex items-center justify-center">
                🔗
              </div>
              <div className="IconYoutube w-6 h-6 flex items-center justify-center">
                ▶️
              </div>
            </div>
          </div>

          {/* Middle and Right Columns */}
          <div className="Column w-full lg:w-2/3 flex flex-col lg:flex-row justify-end gap-10 mt-12">
            <div className="LinkList flex flex-col gap-2">
              <div className="Link text-Link-primary text-sm text-black font-semibold">
                Help Center
              </div>
              <div className="Link text-Link-primary text-sm text-black font-semibold">
                About Us
              </div>
              <div className="Link text-Link-primary text-sm text-black font-semibold">
                Contact Support
              </div>
              <div className="Link text-Link-primary text-black text-sm font-semibold">
                Blog Posts
              </div>
              <div className="Link text-Link-primary text-sm font-semibold text-black">
                User Reviews
              </div>
            </div>
            <div className="LinkList flex flex-col gap-2">
              <div className="Link text-Link-primary text-sm font-semibold text-black">
                FAQs
              </div>
              <div className="Link text-Link-primary text-sm font-semibold text-black">
                Careers
              </div>
              <div className="Link text-Link-primary text-sm font-semibold text-black">
                Affiliate Program
              </div>
              <div className="Link text-Link-primary text-sm font-semibold text-black">
                Site Map
              </div>
              <div className="Link text-Link-primary text-sm font-semibold text-black">
                Feedback
              </div>
            </div>
          </div>
        </div>

        {/* Divider and Bottom Links */}
        <div className="Credits w-full max-w-6xl flex flex-col gap-6">
          <div className="Divider w-full h-px bg-Border-primary" />
          <div className="Row flex flex-col md:flex-row justify-between items-center text-sm text-Text-primary text-black">
            <div>© 2024 BargainBuddy. All rights reserved.</div>
            <div className="FooterLinks flex gap-4">
              <div className="PrivacyPolicy text-black text-Link-primary underline">
                Privacy Policy
              </div>
              <div className="TermsOfService text-black text-Link-primary underline">
                Terms of Service
              </div>
              <div className="CookiesSettings text-black text-Link-primary underline">
                Cookies Settings
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
