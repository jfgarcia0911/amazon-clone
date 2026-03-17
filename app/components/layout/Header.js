"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import SearchBar from "./SearchBar";
import { useAuth } from "../../context/AuthContext";
import {
	Menu,
	X,
	UserRound,
	Home,
	ChevronDown,
	ChevronUp,
	ChevronRight,
} from "lucide-react";
import useScrollDirection from "../../hooks/useScrollDirection";
import Logo from "../header/Logo";
import DeliverTo from "../header/DeliverTo";
import LanguageSelector from "../header/LanguageSelector";
import AccoutMenu from "../header/AccoutMenu";
import CartIcon from "../header/CartIcon";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
	const { user } = useAuth();
	const isVisible = useScrollDirection();
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const [expand, setExpand] = useState(false);
	const handleClick = () => {
		router.push("/");
		setOpen(!open);
	};
	const items = [
		"Amazon Music",
		"Prime Video",
		"Books",
		"Echo & Alexa",
		"Fire Tablets",
		"Fire TV",
		"Amazon Luna",
		"Kindle",
		"Pets",
		"Electronics",
		"Gift Cards",
		"Computers",
		"Handmade",
		"Home Services",
		"Amazon Luxury",
		"Our Brands",
		"Pet Profile",
		"Prime",
		"Amazon Photos",
		"Prime Video",
		"Purchase Reminders",
		"Sell products on Amazon",
		"Add Prime to your site",
		"Subscribe & Save",
		"Wedding Registry",
		"Drone Delivery",
	];

	const handleSignin = () => {
		router.push("/sign-in");
	};
	return (
		<div>
			<div
				className={`bg-gray-900 fixed z-50 top-0 text-white text-nowrap w-full  ${
					isVisible === "up" ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div
					className={`flex flex-wrap  items-center  justify-between px-4 py-1  lg:space-x-3 `}
				>
					<div className="flex space-x-3">
						<Menu
							className="text-white cursor-pointer flex lg:hidden"
							size={30}
							onClick={() => setOpen(!open)}
						/>

						{/* Logo */}
						<Logo />
					</div>

					{/* Deliver To */}
					<DeliverTo />

					{/* Search Bar */}
					<div className="xl:flex hidden flex-1">
						<SearchBar />
					</div>

					{/* Language */}
					<LanguageSelector user={user} />

					{/* Hello Sign in */}
					<AccoutMenu user={user} />

					{/* Returns & Orders				 */}
					<div className="hidden lg:flex relative space-x-1 items-center w-18 border border-transparent  hover:border-white px-1 py-2 cursor-pointer">
						<div className="text-xs leading-none">
							Returns{"    "}
							<span className="text-sm block font-bold">& Orders</span>
						</div>
					</div>

					{/* Cart */}
					<CartIcon user={user} />

					<div className="flex xl:hidden w-full">
						<SearchBar />
					</div>
				</div>
			</div>

			{/* Open modal */}
			<AnimatePresence>
				{open && (
					<motion.div
						initial={{ opacity: 0, scaleX: 0 }}
						animate={{ opacity: 1, scaleX: 1 }}
						exit={{ opacity: 0, scaleX: 0 }}
						transition={{ duration: 1, ease: "easeInOut" }}
						style={{ transformOrigin: "left" }}
						className="fixed top-0 w-full text-white  z-50"
					>
						<div className="flex w-full">
							{/* Left Navigation */}

							<div className="w-full bg-white h-screen overflow-y-auto">
								<div className="  bg-gray-800 px-4 pt-5 pb-3">
									{user ? (
										<div className="flex justify-end">
											<h1 className=" mr-1">{user.displayName}</h1>
										</div>
									) : (
										<div
											onClick={handleSignin}
											className="flex items-center cursor-pointer"
										>
											<h1 className="ml-auto mr-1">Sign in</h1>
											<UserRound size={25} className=" " />
										</div>
									)}
									<div>
										<h2 className="font-bold text-lg">Browse </h2>
										<h1 className="font-normal text-2xl -mt-2">Amazon</h1>
									</div>
								</div>
								{/* First Section */}
								<div className="text-black px-4 font-bold text-lg">
									<div
										onClick={handleClick}
										className="flex justify-between py-3"
									>
										<h1>Amazon Home</h1>
										<Home size={25} className=" cursor-pointer" />
									</div>
								</div>
								{/* Line */}
								<div className="h-1 bg-gray-300"></div>
								{/* Second Section */}
								<div className="text-black px-4 font-bold text-lg py-3">
									<h1>Amazon Home</h1>
									<h2 className="font-normal text-sm mt-5">Movers & Shakers</h2>
								</div>
								{/* Line */}
								<div className="h-1 bg-gray-300"></div>
								{/* Third Section */}
								<div className="text-black px-4 font-bold text-lg py-3 h-full">
									<h1>Top Departments</h1>
									<h2 className="font-normal text-sm mt-5">Home</h2>
									<h2 className="font-normal text-sm mt-5">
										Health & Household
									</h2>
									<h2 className="font-normal text-sm mt-5">Books </h2>
									<h2 className="font-normal text-sm mt-5">PC </h2>

									<AnimatePresence>
										{!expand && (
											<motion.div
												initial={{ opacity: 0, scaleY: 0 }}
												animate={{ opacity: 1, scaleY: 1 }}
												exit={{ opacity: 0, scaleY: 0 }}
												transition={{ duration: 0.3, ease: "easeInOut" }}
												style={{ transformOrigin: "bottom" }}
												onClick={() => setExpand(!expand)}
												className="flex items-center mt-5  cursor-pointer"
											>
												<h2 className="font-normal text-sm mr-1">See all </h2>
												<ChevronDown size={20} />
											</motion.div>
										)}
									</AnimatePresence>
									<AnimatePresence>
										{expand && (
											<motion.div
												initial={{ opacity: 0, scaleY: 0 }}
												animate={{ opacity: 1, scaleY: 1 }}
												exit={{ opacity: 0, scaleY: 0 }}
												transition={{ duration: 1.3, ease: "easeInOut" }}
												style={{ transformOrigin: "top" }}
												className="overflow-hidden"
											>
												{/* Line */}
												<div className="border mt-5  border-gray-300"></div>

												{items.map((item, index) => (
													<div
														key={index}
														className="flex justify-between font-normal text-sm mt-5"
													>
														<h1>{item}</h1>
														<ChevronRight
															size={20}
															className=" cursor-pointer"
														/>
													</div>
												))}

												<div
													onClick={() => setExpand(!expand)}
													className="flex items-center mt-5 cursor-pointer mb-5"
												>
													<h2 className="font-normal text-sm mr-1  ">
														See less{" "}
													</h2>
													<ChevronUp size={20} />
												</div>
											</motion.div>
										)}
									</AnimatePresence>
								</div>
							</div>
							{/* Right Navigation */}
							<div
								onClick={() => setOpen(!open)}
								className="bg-black/80 min-h-screen flex justify-center  w-20"
							>
								<X size={30} className="mt-10 cursor-pointer" />
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
