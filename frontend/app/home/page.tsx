"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { FaInstagram, FaWhatsapp, FaYoutube, FaBookReader, FaList } from "react-icons/fa";
import { TbWorldWww } from "react-icons/tb";
import { GrList, GrUserExpert } from "react-icons/gr";
import { MdAttachMoney, MdOutlineAccessTime } from "react-icons/md";
import { IoIosArrowRoundForward } from "react-icons/io";
import { FaArrowTrendUp } from "react-icons/fa6";
import { MdCompareArrows } from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { IoMdLink } from "react-icons/io";
import { CiShoppingTag, CiViewTimeline } from "react-icons/ci";
import { motion } from "framer-motion";
import BannerPng from "../../app/srcImages/banner.svg";
import Blob from "../../app/srcImages/blob.svg";
import Navbar from "../components/landingPage/Nav";
import hero from "../srcImages/hero.svg";

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

const MotionImage = motion(Image);

const SlideLeft = (delay: number) => ({
	initial: { opacity: 0, x: 50 },
	animate: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.3, delay, ease: "easeInOut" },
	},
});

const LandingPage: React.FC = () => {
	return (
		<main className="overflow-x-hidden bg-white text-dark">
			<section className="bg-light overflow-hidden relative">
				<Navbar />
				<nav className="navbar bg-transparent"> </nav>
				<div className="container grid grid-cols-1 md:grid-cols-2 min-h-[650px]">
					<div className="flex flex-col justify-center py-14 md:py-0 relative z-20">
						<motion.h1 variants={FadeUp(0.6)} initial="initial" animate="animate" className="text-5xl lg:text-6xl font-bold !leading-snug text-center md:text-left">
							Compare and Track <span className="text-secondary">Prices</span>
						</motion.h1>
						<motion.div variants={FadeUp(0.8)} initial="initial" animate="animate" className="flex justify-center md:justify-start">
							<button
								className="bg-primary text-white font-semibold rounded-lg hover:bg-secondary 
              duration-200 shadow-[0px_10px_8px_-7px_#ffd978] hover:shadow-[0px_10px_8px_-7px_#69a79c] 
              py-2 px-6 flex items-center gap-2 group">
								Get Started
								<IoIosArrowRoundForward className="text-xl group-hover:translate-x-2 group-hover:-rotate-45 duration-300" />
							</button>
						</motion.div>
					</div>
					<div className="flex justify-center items-center">
						<MotionImage
							src={hero} // `StaticImageData` works here
							alt="Hero"
							width={600} // You must specify width and height
							height={400}
							className="w-[400px] xl:w-[600px] relative z-10 drop-shadow"
							initial={{ opacity: 0, y: -50 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, ease: "easeOut" }}
						/>
						<MotionImage
							src={Blob}
							alt="Background Blob"
							width={1500} // Specify width and height
							height={800}
							className="absolute -bottom-32 w-[800px] md:w-[1500px] hidden md:block"
						/>
					</div>
				</div>
			</section>

			{/* Services Section */}
			<section className="bg-white py-16">
				<div className="container flex flex-col items-center">
					<h1 className="text-4xl font-bold mb-10 text-center">Why Bargain Buddy?</h1>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8 justify-center">
						{[
							{
								id: 1,
								title: "Compare Prices",
								icon: (
									<span className="text-primary">
										<MdCompareArrows />
									</span>
								),
								delay: 0.2,
							},
							{
								id: 2,
								title: "Track Prices",
								icon: (
									<span className="text-primary">
										<CiViewTimeline />
									</span>
								),
								delay: 0.3,
							},
							{
								id: 3,
								title: "Price Trends",
								icon: (
									<span className="text-primary">
										<FaArrowTrendUp />
									</span>
								),
								delay: 0.5,
							},
							{
								id: 4,
								title: "Smart Wishlist",
								icon: (
									<span className="text-primary">
										<FaThList />
									</span>
								),
								delay: 0.6,
							},
							{
								id: 5,
								title: "Smart Shopping",
								icon: (
									<span className="text-primary">
										<CiShoppingTag />
									</span>
								),
								delay: 0.7,
							},
							{
								id: 6,
								title: "Save Money",
								icon: (
									<span className="text-primary">
										<MdAttachMoney />
									</span>
								),
								delay: 0.8,
							},
						].map((service) => (
							<motion.div key={service.id} variants={SlideLeft(service.delay)} initial="initial" whileInView={"animate"} viewport={{ once: true }} className="bg-[#f4f4f4] rounded-2xl flex flex-col gap-4 items-center justify-center p-4 py-7 hover:bg-white hover:scale-110 duration-300 hover:shadow-2xl">
								<div className="text-4xl mb-4">{service.icon}</div>
								<h1 className="text-lg font-semibold text-center px-3">{service.title}</h1>
							</motion.div>
						))}
					</div>
				</div>
			</section>

			{/* Banner Section */}
			<section className="py-14 md:py-24">
				<div className="container grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="flex justify-center items-center">
						<MotionImage
							src={BannerPng}
							alt=""
							width={1500} // Specify width and height
							height={800}
							className="w-[350px] md:max-w-[450px] object-cover drop-shadow(6px 8px 10px rgba(0, 0, 0, 0.5))"
						/>
					</div>
					<div className="flex flex-col justify-center text-center md:text-left space-y-12">
						<motion.h1 className="text-3xl md:text-4xl font-bold">How it works?</motion.h1>
						<div className="flex flex-col gap-6">
							{[
								{
									icon: (
										<span className="text-primary">
											<IoMdLink />
										</span>
									),
									text: "Paste product link",
								},
								{
									icon: (
										<span className="text-primary">
											<MdCompareArrows />
										</span>
									),
									text: "Compare item prices",
								},
								{
									icon: (
										<span className="text-primary">
											<GrList />
										</span>
									),
									text: "Save items to your wishlist",
								},
							].map((item, index) => (
								<motion.div key={index} variants={FadeUp(0.2 * (index + 1))} initial="initial" whileInView={"animate"} viewport={{ once: true }} className="flex items-center gap-4 p-6 bg-[#f4f4f4] rounded-2xl hover:bg-white duration-300 hover:shadow-2xl">
									{item.icon}
									<p className="text-lg">{item.text}</p>
								</motion.div>
							))}
						</div>
					</div>
				</div>
			</section>

			{/* Footer Section */}
			<footer className="py-28 bg-[#f7f7f7]">
				<motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} className="container">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14">
						<div className="space-y-4 max-w-[300px]">
							<h1 className="text-2xl font-bold">Bargain Buddy</h1>
							<p className="text-dark2">Bargain Buddy is a smart shopping assistant designed to help users find the best deals across multiple stores. By simply inputting a product link, Bargain Buddy compares prices, displays price trends, and highlights the cheapest options based on location and store availability.</p>
						</div>
						<div className="grid grid-cols-2 gap-10">
							<div className="space-y-4">
								<h1 className="text-2xl font-bold">Stores</h1>
								<ul className="space-y-2 text-lg">
									<li>Best Buy</li>
									<li>Walmart</li>
									<li>Amazon</li>
									<li>Staples</li>
								</ul>
							</div>
							<div className="space-y-4">
								<h1 className="text-2xl font-bold">Links</h1>
								<ul className="space-y-2 text-lg">
									<li>Home</li>
									<li>Services</li>
									<li>About</li>
									<li>Contact</li>
								</ul>
							</div>
						</div>
						<div className="space-y-4 max-w-[300px]">
							<h1 className="text-2xl font-bold">Get In Touch</h1>
							<div className="flex items-center">
								<input type="text" placeholder="Enter your email" className="p-3 rounded-s-xl bg-white w-full py-4 placeholder:text-dark2" />
								<button className="bg-primary text-white font-semibold py-4 px-6 rounded-e-xl">Go</button>
							</div>
							<div className="flex space-x-6 py-3">
								<FaWhatsapp />
								<FaInstagram />
								<TbWorldWww />
								<FaYoutube />
							</div>
						</div>
					</div>
				</motion.div>
			</footer>
		</main>
	);
};

export default LandingPage;
