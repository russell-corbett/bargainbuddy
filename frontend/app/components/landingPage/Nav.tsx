import React from "react";
import { IoMdMenu } from "react-icons/io";
import { motion } from "framer-motion";
import Link from "next/link";

const NavbarMenu = [
	{
		id: 1,
		title: "Home",
		path: "/",
	},
	{
		id: 2,
		title: "Our Team",
		path: "/team",
	},
	{
		id: 4,
		title: "Contact Us",
		path: "/contact",
	},
];
const Navbar = () => {
	return (
		<nav className="relative z-20">
			<motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} className="container py-10 flex justify-between items-center">
				{/* Logo section */}
				<div className="flex relative">
					<h1 className="font-bold text-2xl font-serif text-primary">Bargain </h1>
					<h1 className="absoulte font-bold text-2xl font-serif text-secondary gap">Buddy</h1>
				</div>
				{/* Menu section */}
				<div className="hidden lg:block">
					<ul className="flex items-center gap-3">
						{NavbarMenu.map((menu) => (
							<li key={menu.id}>
								<a href={menu.path} className="inline-block py-2 px-3 hover:text-secondary relative group">
									<div className="w-2 h-2 bg-secondary absolute mt-4 rounded-full left-1/2 -translate-x-1/2 top-1/2 bottom-0 group-hover:block hidden"></div>
									{menu.title}
								</a>
							</li>
						))}
						<Link href="/accountSignIn">
							<button className="bg-primary text-white font-semibold rounded-lg hover:bg-secondary duration-200 shadow-[0px_10px_8px_-7px_#ffd978] hover:shadow-[0px_10px_8px_-7px_#69a79c] py-2 px-6">Sign In</button>
						</Link>
					</ul>
				</div>
				{/* Mobile Hamburger menu section */}
				<div className="lg:hidden">
					<IoMdMenu className="text-4xl" />
				</div>
			</motion.div>
		</nav>
	);
};

export default Navbar;
