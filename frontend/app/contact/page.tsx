"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const FadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      duration: 0.5,
      delay,
      ease: "easeInOut",
    },
  },
});

const ContactPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent page refresh
    setIsPopupVisible(true); // Show the popup
    setTimeout(() => setIsPopupVisible(false), 1000); // Hide the popup after 3 seconds
  };

  return (
    <div className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
      {/* Fixed Navigation Bar */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-gray-50 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center">
          <Link
            href="/home"
            className="text-3xl md:text-2xl font-bold text-primary hover:text-secondary transition-all duration-300 font-serif"
          >
            Bargain<span className="text-secondary">Buddy</span>
          </Link>
        </div>
      </motion.nav>

      <div className="pt-24 flex-grow flex flex-col justify-center items-center">
        {/* Header Section */}
        <motion.header
          className={`text-center transition-opacity duration-300 ${
            isScrolled ? "opacity-50" : "opacity-100"
          } py-8`}
          {...FadeUp(0.2)}
        >
          <h1 className="text-5xl md:text-4xl font-bold mb-2">Contact Us</h1>
        </motion.header>

        {/* Line Bar */}
        <motion.div
          className="w-full max-w-6xl border-t-2 border-gray-300 my-4"
          {...FadeUp(0.3)}
        ></motion.div>

        {/* Contact Section */}
        <section
          className={`w-full max-w-6xl mx-auto px-6 py-8 flex flex-col lg:flex-row justify-center items-center gap-12 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-100"
          }`}
        >
          {/* Contact Form */}
          <motion.div
            className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg"
            {...FadeUp(0.3)}
          >
            <h2 className="text-2xl font-bold mb-6 text-primary">
              Send Us a Message
            </h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className="w-full px-4 py-2 mt-2 border rounded-lg focus:ring-primary focus:border-primary"
                  placeholder="Write your message here"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition duration-300"
              >
                Send Message
              </button>
            </form>
          </motion.div>

        </section>

        {/* Popup Message */}
        {isPopupVisible && (
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-green-100 text-green-700 p-4 rounded-lg shadow-md">
            Message Sent!
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
