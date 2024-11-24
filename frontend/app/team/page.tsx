"use client";
import React, { useEffect, useState } from "react";
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

const SlideLeft = (delay: number) => ({
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay, ease: "easeInOut" },
  },
});

const TeamPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Adjust the threshold as needed
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const teamMembers = [
    {
      name: "Russell Corbett",
      role: "Lead Software Developer",
      bio: "Oversees software architecture and ensures the smooth integration of backend systems with a focus on scalability and performance.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Zachary Coffey",
      role: "Frontend/Backend Developer",
      bio: "Crafts seamless user interfaces and robust backend solutions, bridging the gap between user experience and functionality.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Lance Labrador",
      role: "Frontend Developer",
      bio: "Specializes in creating dynamic, responsive interfaces to enhance the overall user experience.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Jacob Norman",
      role: "Backend Developer",
      bio: "Develops efficient backend systems to support robust and secure data processing.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Jesse Lewis",
      role: "Frontend/Authentication Developer",
      bio: "Implements visually appealing designs and secure authentication systems to enhance accessibility and usability.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Alexander Kingsley",
      role: "Frontend Developer",
      bio: "Builds modern and engaging front-end applications to ensure a seamless user experience.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Matthew Jones",
      role: "Frontend/Backend Developer",
      bio: "Collaborates across the stack to create data-driven solutions with a focus on performance and reliability.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Aman Azad",
      role: "Backend Developer",
      bio: "Designs and optimizes server-side logic, ensuring high availability and performance.",
      imgSrc: "https://via.placeholder.com/150",
    },
    {
      name: "Mohammed Al-Taie",
      role: "Backend Developer",
      bio: "Manages infrastructure, builds scalable APIs, and ensures smooth deployments for production environments.",
      imgSrc: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="bg-gray-50 text-gray-900">
      {/* Fixed Navigation Bar */}
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
          className={`py-16 text-center transition-opacity duration-300 ${
            isScrolled ? "opacity-50" : "opacity-100"
          }`}
          {...FadeUp(0.2)}
        >
          <h1 className="text-2xl md:text-4xl font-bold mb-4">Meet Our Team</h1>
        </motion.header>

        {/* Line Bar */}
        <motion.div
          className="w-full max-w-6xl border-t-2 border-gray-300 my-4"
          {...FadeUp(0.3)}
        ></motion.div>

        {/* Team Members Section */}
        <section
          className={`container mx-auto px-6 py-8 transition-opacity duration-300 ${
            isScrolled ? "opacity-100" : "opacity-100"
          }`}
        >
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 text-center"
            {...FadeUp(0.4)}
          >
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center space-y-4"
                {...SlideLeft(index * 0.2)}
              >
                {/* Circular Image */}
                <img
                  src={member.imgSrc}
                  alt={`${member.name}`}
                  className="w-60 h-60 rounded-full object-cover border-2 border-primary shadow-lg"
                />
                {/* Member Details */}
                <h3 className="text-xl font-bold text-primary">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 font-medium">
                  {member.role}
                </p>
                <p className="text-sm text-gray-700 max-w-xs">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default TeamPage;
