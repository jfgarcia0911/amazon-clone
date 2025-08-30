"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Search, ShoppingCart } from "lucide-react";

export default function Header() {
	const inputRef = useRef();
	const [open, setOpen] = useState(false);
	const [category, setCategory] = useState("All");
	const buttonRef = useRef();
	const [categoryWidth, setCategoryWidth] = useState(60);
	const [languageCode, setLanguageCode] = useState("EN");
	const [cartQuantity, setCartQuantity] = useState(0)
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
		setOpen(!open);
	};

	const handleCartQuantity = () => {
		setCartQuantity((prev) => {
			return prev + 1
		})
	}

	useEffect(() => {
		const width = buttonRef.current.offsetWidth;
		setCategoryWidth(width);
	}, [category]);

	return (
		<header className="bg-gray-900  text-white ">
			<div className="flex items-center  justify-between px-5 py-1  space-x-5 h-16">
				{/* Logo */}
				<div className="flex items-center hover:border-1 py-1 px-1">
					<Image
						src="/amazon.png"
						alt="Logo"
						width={80}
						height={40}
						priority
						className="object-contain h-auto w-auto"
					/>
				</div>

				{/* Deliver To */}
				<div className="flex relative space-x-1 items-center w-28 hover:border-1 p-1">
					<MapPin size={40} className=" " />
					<div className="text-xs leading-none">
						Deliver to{" "}
						<span className="text-sm font-bold">Philippines</span>
					</div>
				</div>

				{/* Search Bar */}
				<div className="relative flex flex-1 text-black   h-10">
					<form className="flex flex-1  bg-white rounded-sm focus-within:ring-3 focus-within:ring-yellow-500">
						<input
							ref={inputRef}
							type="text"
							placeholder="Search Amazon"
							className=" outline-none   text-black  py-2 flex flex-1"
							style={{ paddingLeft: `${categoryWidth + 8}px` }}
						/>
						<button
							onClick={handleClick}
							type="submit"
							aria-label="Search Amazon"
							className="bg-orange-300 px-3 py-2 ml-auto rounded-r-sm hover:brightness-90"
						>
							<Search className="text-black" size={25} />
						</button>
					</form>

					{/* Dropdown Button */}
					<button
						onClick={() => setOpen(!open)}
						ref={buttonRef}
						type="button"
						aria-label={`Search in ${category} category`}
						className="absolute h-10 px-2 space-x-1  text-gray-500 flex items-center justify-center  border-r border-gray-400 z-10 rounded-sm focus:ring-2 focus:ring-yellow-500 cursor-pointer"
					>
						<div className="text-sm">{category}</div>
						<div class="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray"></div>
					</button>

					{/* Dropdown menu */}
					{open && (
						<div className="absolute w-[210px] h-[400px] top-10 z-10 rounded-xs bg-white border border-gray-500 overflow-y-auto">
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
					<div className="flex space-x-1 hover:border-1  py-3 px-1">
						<Image
							src="/us-flag.png"
							alt="Logo"
							width={20}
							height={20}
							priority
							className="object-contain "
						/>
						<div>{languageCode}</div>
					</div>
					{/* Arrow Down */}
					<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white"></div>
					{/* <!-- Tooltip container (hidden by default) --> */}
					<div class="absolute hidden  group-hover:block top-13 left-0 mt- w-52 bg-white border border-gray-300 rounded shadow-lg z-50">
						{/* <!-- Triangle at the top --> */}
						<div class="absolute -top-2 left-12 w-4 h-4 rotate-45 bg-white border-t border-l border-gray-200"></div>
						{/* <!-- Tooltip content --> */}
						<div class="p-2 text-black">
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
				<div className="flex relative space-x-1 items-center w-34  group">
					<div className="text-xs leading-none group-hover:border-1 px-1 py-2">
						Helllo, sign in{" "}
						<span className="text-sm font-bold">
							Account & Lists
						</span>
					</div>
					{/* Arrow Down */}
					<div className=" border-l-4 border-t-4 border-r-4 border-l-transparent border-r-transparent "></div>
					{/* Tooltip container */}
					<div className="absolute hidden   group-hover:block  bg-white w-150 h-105 top-13 -left-80 z-30 border border-gray-300 rounded-lg">
						{/* <!-- Triangle at the top --> */}
						<div className="absolute bg-white h-4 w-4 rotate-45 -top-2 left-110">
							d
						</div>
						{/* <!-- Tooltip content --> */}
						<div className="flex w-full ">
							<button className="text-black text-sm h-8 bg-yellow-300 rounded-md w-55 p-1 mx-auto mt-4">
								Sign in
							</button>
						</div>
						<div className="flex w-full ">
							<div className="text-black text-xs mx-auto mt-3">
								New customer?{" "}
								<span className="text-blue-500 underline">
									Start here.
								</span>
							</div>
						</div>
						<div className="text-gray-600  flex px-5 justify-around w-full mt-6">
							<div className="w-full space-y-2">
								<h1 className="font-bold text-black">
									Your Lists
								</h1>
								<div className="text-sm space-y-1">
									<p>Create a List</p>
									<p>Find a list or Registry</p>
								</div>
							</div>
							<div className=" w-full space-y-2">
								<h1 className="font-bold text-black">
									Your Account
								</h1>
								<div className="text-sm space-y-1">
									<p>Account</p>
									<p>Orders</p>
									<p>Recommendations</p>
									<p>Browsing History</p>
									<p>Watchlist</p>
									<p>Video Purchases & Rentals</p>
									<p>Kindle Unlimited</p>
									<p>Content & Devices</p>
									<p>Subscribe & Save Itemms</p>
									<p>Membership & Subscriptions</p>
									<p>Music Library</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Returns & Orders				 */}
				<div className="flex relative space-x-1 items-center w-18 hover:border-1 px-1 py-2">
					<div className="text-xs leading-none">
						Returns{"    "}
						<span className="text-sm block font-bold">
							& Orders
						</span>
					</div>
				</div>

				{/* Cart */}
				<div onClick={handleCartQuantity} className="flex relative  items-center w-20 hover:border-1 px-1 py-2">
					<div className="text-xs  flex items-baseline space-x-1">
						<ShoppingCart size={30} />
						<div className="relative">
							<span class="absolute -top-6 left-1 text-lg text-orange-300 text-center">{cartQuantity}</span>
							<span className="text-sm font-bold">Cart</span>
						</div>
					</div>
				</div>

				
			</div>
		</header>
	);
}
{
	/* <ShoppingCart /> */
}
