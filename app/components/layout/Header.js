"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Search, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext ";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import SecondaryNav from "./SecondaryNav";
export default function Header() {
	const { user } = useAuth();
	const inputRef = useRef();
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState("All");
	const buttonRef = useRef();
	const dropdownRef = useRef();
	const [categoryWidth, setCategoryWidth] = useState(60);
	const [languageCode, setLanguageCode] = useState("EN");
	const [cartQuantity, setCartQuantity] = useState(0);
	const router = useRouter();
	const categories = [
		"All Departments",
		"Arts & Crafts",
		"Automotive",
		"Baby",
		"Beauty & Personal Care",
		"Books",
		"Boy's Fashion",
		"Computers",
		"Deals",
		"Digital Music",
		"Electronics",
		"Girl's Fashion",
		"Health & Household",
		"Home Kitchen",
		"Industrial Scientific",
		"Kindle Store",
		"Luggage",
		"Men's Fashion",
		"Movies & TV",
		"Music, CD's & Vinyl",
		"Pet Supplies",
		"Prime Video",
		"Software",
		"Sports Outdoor",
		"Tools & Home Improvement",
		"Toys and Games",
		"Video Games",
		"Women's Fashion",
	];
	const languages = [
		{ language: "English", code: "EN" },
		{ language: "español", code: "ES" },
		{ language: "العربية ", code: "AR" },
		{ language: "Deutsch ", code: "DE" },
		{ language: "עברית ", code: "HE" },
		{ language: "한국어 ", code: "KO" },
		{ language: "português ", code: "PT" },
		{ language: "中文(简体)", code: "ZH" },
		{ language: "中文(繁體)", code: "ZH" },
	];

	const handleClick = (e) => {
		e.preventDefault();
		const value = inputRef.current.value;

		console.log(value);
		console.log(category);
	};

	const handleCategory = (category) => {
		setCategory(category);
		setOpen(false);
	};

	const handleCartQuantity = () => {
		setCartQuantity((prev) => {
			return prev + 1;
		});
	};

	const handleSignin = () => {
		router.push("/sign-in");
	};
	const handleSignup = () => {
		router.push("/sign-up");
	};

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			});
	};

	useEffect(() => {
		const width = buttonRef.current.offsetWidth;
		setCategoryWidth(width);
	}, [category]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<header className="bg-gray-900  text-white text-nowrap ">
				<div className="flex items-center  justify-between px-5 py-1  space-x-3 h-16">
					{/* Logo */}
					<div className="relative w-[112px]  flex items-center justify-center hover:border-1 py-2 px-1  cursor-pointer">
						<Image
							src="/amazon.png"
							alt="Logo"
							width={100}
							height={10}
							priority
							className="object-contain"
						/>
					</div>

					{/* Deliver To */}
					{/* <div className="flex relative space-x-1 items-center w-28 border border-transparent  hover:border-white p-1 cursor-pointer">
						<MapPin size={40} className=" " />
						<div className="text-xs leading-none">
							Deliver to{" "}
							<span className="text-sm font-bold">
								Philippines
							</span>
						</div>
					</div> */}
					<div className="text-xs relative w-[110px] leading-none border border-transparent  hover:border-white px-1 py-2 cursor-pointer">
						<MapPin size={20} className="absolute top-4 left-1 " />
						<div className="ml-5">Deliver to</div>
						<span className="text-sm font-bold block ml-5 ">
							Philippines
						</span>
					</div>

					{/* Search Bar */}
					<div className="relative flex flex-1 text-black   h-10">
						<form className="flex flex-1  bg-white rounded-sm focus-within:ring-3 focus-within:ring-yellow-500">
							<input
								ref={inputRef}
								type="text"
								placeholder="Search Amazon"
								className=" outline-none   text-black  py-2 flex flex-1"
								style={{
									paddingLeft: `${categoryWidth + 8}px`,
								}}
							/>
							<button
								onClick={handleClick}
								type="submit"
								aria-label="Search Amazon"
								className="bg-orange-300 px-3 py-2 ml-auto rounded-r-sm hover:brightness-90"
							>
								<Search
									className="text-black cursor-pointer"
									size={25}
								/>
							</button>
						</form>

						{/* Dropdown Button */}
						<button
							onClick={() => setOpen(!open)}
							ref={buttonRef}
							type="button"
							aria-label={`Search in ${category} category`}
							className="absolute h-10 px-2 space-x-1  text-gray-500 flex items-center justify-center  border-r border-gray-400 z-10 rounded-sm focus:ring-2 focus:ring-yellow-500 hover:text-black cursor-pointer"
						>
							<div className="text-sm ">{category}</div>
							{/* Arrow down */}
							<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray"></div>
						</button>

						{/* Dropdown menu */}
						{open && (
							<div
								ref={dropdownRef}
								className="absolute w-[210px] h-[400px] top-10 z-10 rounded-xs bg-white border border-gray-500 overflow-y-auto"
							>
								{categories.map((cat) => (
									<button
										key={cat}
										onClick={() => handleCategory(cat)}
										aria-label="Search in all categories"
										className="block text-sm  hover:bg-blue-500 hover:text-white w-full p-1 text-left"
									>
										{cat}
									</button>
								))}
							</div>
						)}
					</div>
					{/* Language */}
					<div className="flex relative group  items-center  ">
						<div className="flex space-x-1 border border-transparent  group-hover:border-white cursor-pointer py-3 px-1">
							<Image
								src="/us-flag.png"
								alt="Logo"
								width={20}
								height={20}
								priority
								className="object-contain"
							/>
							<div>{languageCode}</div>
						</div>
						{/* Arrow Down */}
						<div className="relative w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white cursor-pointer">
							{/* <!-- Triangle at the top --> */}
							<div className="absolute bg-white h-4 w-4 rotate-45 top-4 -left-2  hidden   group-hover:block "></div>
						</div>
						{/* <!-- Tooltip container (hidden by default) --> */}
						<div className="absolute hidden  group-hover:block top-12 left-0 mt- w-52 bg-white border border-gray-300 rounded shadow-lg z-50">
							{/* <!-- Tooltip content --> */}
							<div className="p-2 text-black">
								<h1 className="text-sm">
									Change Language{" "}
									<span className="underline text-blue-500 text-xs">
										Learn more
									</span>
								</h1>

								<div className="mt-2 space-y-2">
									{languages.map((lang) => (
										<label
											key={lang.language}
											onClick={() =>
												setLanguageCode(lang.code)
											}
											className="flex items-center space-x-1 text-sm cursor-pointer hover:underline hover:text-orange-500"
										>
											<input
												type="radio"
												name="language"
												value={lang.code}
												className="h-4 w-4 cursor-pointer"
											/>
											<span>
												{lang.language} - {lang.code}
											</span>
										</label>
									))}
								</div>
							</div>
						</div>
					</div>

					{/* Hello Sign in */}
					<div className="flex relative space-x-1 items-center    group">
						<div className="text-xs leading-none border border-transparent  group-hover:border-white px-1 py-2 cursor-pointer">
							Helllo,{" "}
							{user ? user.displayName || user.email : `Sign in`}
							<span className="text-sm font-bold block">
								Account & Lists
							</span>
						</div>
						{/* Arrow Down */}
						<div className="relative border-l-4 border-t-4 border-r-4 border-l-transparent border-r-transparent cursor-pointer">
							{/* <!-- Triangle at the top --> */}
							<div className="absolute bg-white h-4 w-4 rotate-45 top-4 -left-2  hidden   group-hover:block "></div>
						</div>
						{/* Tooltip container */}
						<div className="absolute hidden   group-hover:block  bg-white w-150 h-105 top-12 -left-80 z-30 border border-gray-300 rounded-lg">
							{/* <!-- Tooltip content --> */}
							{user ? (
								<div className="flex  items-center justify-between px-8 py-7 text-black">
									<div className="flex h-10 items-center">
										<Image
											src={user.photoURL}
											width={40}
											height={40}
											alt="profile pic"
											priority
											className="object-contain rounded-full"
										/>
										<div className="ml-3 ">
											<h1 className=" font-semibold text-md">
												{user.displayName || user.email}
											</h1>
											<p className="text-sm text-gray-500">
												Account holder
											</p>
										</div>
									</div>
									<div className="text-blue-500 text-sm font-semibold pb-1  cursor-pointer">
										<span className="hover:border-b">
											Manage Profiles
										</span>{" "}
										<span>{`>`}</span>
									</div>
								</div>
							) : (
								<>
									<div className="flex w-full ">
										<button
											onClick={handleSignin}
											className="text-black text-sm h-8 bg-yellow-300 rounded-md w-55 p-1 mx-auto mt-4  cursor-pointer"
										>
											Sign in
										</button>
									</div>
									<div className="flex w-full ">
										<div className="text-black text-xs mx-auto mt-3">
											New customer?{" "}
											<span
												className="text-blue-500 underline cursor-pointer"
												onClick={handleSignup}
											>
												Start here.
											</span>
										</div>
									</div>
								</>
							)}
							<div className="text-gray-600  flex px-5 justify-around w-full ">
								<div className="w-full space-y-2">
									<h1 className="font-bold text-black">
										Your Lists
									</h1>
									<div className="text-sm space-y-1">
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Create a List
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Find a list or Registry
										</p>
									</div>
								</div>
								<div className=" w-full space-y-2">
									<h1 className="font-bold text-black">
										Your Account
									</h1>
									<div className="text-sm space-y-1">
										{user ? (
											<>
												<p className="hover:underline hover:text-orange-500 cursor-pointer">
													Switch account
												</p>
												<p
													onClick={handleLogout}
													className="cursor-pointer hover:underline hover:text-orange-500 mb-3"
												>
													Sign out
												</p>
											</>
										) : (
											""
										)}
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Account
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Orders
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Recommendations
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Browsing History
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Watchlist
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Video Purchases & Rentals
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Kindle Unlimited
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Content & Devices
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Subscribe & Save Itemms
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Membership & Subscriptions
										</p>
										<p className="hover:underline hover:text-orange-500 cursor-pointer">
											Music Library
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* Returns & Orders				 */}
					<div className="flex relative space-x-1 items-center w-18 border border-transparent  hover:border-white px-1 py-2 cursor-pointer">
						<div className="text-xs leading-none">
							Returns{"    "}
							<span className="text-sm block font-bold">
								& Orders
							</span>
						</div>
					</div>

					{/* Cart */}
					<div
						onClick={handleCartQuantity}
						className="flex relative  items-center w-20 border border-transparent  hover:border-white px-1 py-2 cursor-pointer"
					>
						<div className="text-xs  flex items-baseline space-x-1">
							<ShoppingCart size={30} />
							<div className="relative">
								<span className="absolute -top-6 left-1 text-lg text-orange-300 text-center">
									{cartQuantity}
								</span>
								<span className="text-sm font-bold">Cart</span>
							</div>
						</div>
					</div>
				</div>
			</header>
			<SecondaryNav />
		</>
	);
}
