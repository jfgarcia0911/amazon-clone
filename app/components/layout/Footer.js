import Image from "next/image";
import React from "react";
import { Globe, DollarSign } from "lucide-react";

export default function Footer() {
	const scrollTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};
	
	return (
		<div className="text-white w-full relative flex flex-col text-nowrap">
			{/* First layer */}
			<div
				onClick={scrollTop}
				className="bg-gray-700 hover:opacity-90 py-4 text-center cursor-pointer"
			>
				Back to top
			</div>{" "}
			{/* Second layer */}
			<div className="flex justify-center  space-x-30 py-12 bg-gray-800">
				<div>
					<h1 className="font-bold mb-2">Get to Know Us</h1>
					<div className="opacity-80 space-y-2  w-40">
						<p>Careers</p>
						<p>Blog</p>
						<p>About Amazon</p>
						<p>Investor Relations</p>
						<p>Amazon Devices</p>
						<p>Amazon Science</p>
					</div>
				</div>
				<div>
					<h1 className="font-bold mb-2">Make Money with Us</h1>
					<div className="opacity-80 space-y-2 w-54">
						<p>Sell products on Amazon</p>
						<p>Sell on Amazon Business</p>
						<p>Sell apps on Amazon</p>
						<p>Become an Affiliate</p>
						<p>Advertise Your Products </p>
						<p>Self-Publish with Us</p>
						<p>Host an Amazon Hub</p>
						<p>
							{`> See more Make Money`}{" "}
							<span className="block leading-none">with Us</span>
						</p>
					</div>
				</div>
				<div>
					<h1 className="font-bold mb-2">Amazon Payment Products</h1>
					<div className="opacity-80 space-y-2  w-50">
						<p>Amazon Business Card</p>
						<p>Shop with Points</p>
						<p>Reload Your Balance</p>
						<p>Amazon Currency Converter</p>
					</div>
				</div>
				<div>
					<h1 className="font-bold mb-2">Let Us Help You</h1>
					<div className="opacity-80 space-y-2  w-50">
						<p>
							Amazon and COVID-
							<span className="block leading-none">19</span>
						</p>
						<p>Your Account</p>
						<p>Your Orders</p>
						<p>
							Shipping Rates &{" "}
							<span className="block leading-none">Policies</span>
						</p>
						<p>
							Returns &{" "}
							<span className="block leading-none">
								Replacements
							</span>
						</p>
						<p>
							Manage Your
							<span className="block leading-none">
								Content and Devices
							</span>
						</p>
						<p>Help</p>
					</div>
				</div>
			</div>
			{/* Third layer */}
			<div className="flex items-center justify-center space-x-30  py-10 bg-gray-800 border-t border-gray-500 text-gray-300">
				<div>
					<Image
						src="/amazon.png"
						alt="Logo"
						width={100}
						height={10}
						priority
						className="object-contain"
					/>
				</div>
				<div className="flex space-x-2">
					<div className="flex items-center space-x-2 p-2 w-35 rounded-md border border-gray-500">
						<Globe size={17} />
						<div>English</div>
					</div>
					<div className="flex items-center space-x-2 p-2  rounded-md border border-gray-500">
						<DollarSign size={17} />
						<div>USD - U.S. Dollar</div>
					</div>
					<div className="flex space-x-2 p-2  rounded-md border border-gray-500">
						<Image
							src="/us-flag.png"
							alt="Logo"
							width={20}
							height={20}
							priority
							className="object-contain"
						/>
						<div>United States</div>
					</div>
				</div>
			</div>
			{/* Fourth layer*/}
			<div className="py-12 bg-gray-900 brightness-70 space-y-3 text-sm">
				<div className="flex  justify-center space-x-15  ">
					<div className="w-29">
						<h1>Amazon Music</h1>
						<p className="leading-none text-gray-400">
							Stream millions{" "}
							<span className="block leading-none">of songs</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Amazon Ads</h1>
						<p className="leading-none text-gray-400">
							Reach customers
							<span className="block leading-none">
								wherever they
							</span>
							<span className="block leading-none">
								spend their time
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>6pm</h1>
						<p className="leading-none text-gray-400">
							Score deals
							<span className="block leading-none">
								on fashion brands
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>AbeBooks</h1>
						<p className="leading-none text-gray-400">
							Books, art
							<span className="block leading-none">
								& collectibles
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>ACX</h1>
						<p className="leading-none text-gray-400">
							Audiobook
							<span className="block leading-none">
								Publishing
							</span>
							<span className="block leading-none">
								{" "}
								Made Easy
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Sell on Amazon</h1>
						<p className="leading-none text-gray-400">
							Start a Selling
							<span className="block leading-none"> Account</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Veeqo</h1>
						<p className="leading-none text-gray-400">
							Shipping Software
							<span className="block leading-none">
								{" "}
								Inventory
							</span>
							<span className="block leading-none">
								{" "}
								Management
							</span>
						</p>
					</div>
				</div>
				<div className="flex  justify-center space-x-15 ">
					<div className="w-29">
						<h1>Amazon Business </h1>
						<p className="leading-none text-gray-400">
							Everything For
							<span className="block leading-none">
								{" "}
								Your Business
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Amazon Global </h1>
						<p className="leading-none text-gray-400">
							Ship Orders
							<span className="block leading-none">
								Internationally
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Amazon Web  
							<span className="block leading-none">Services</span>

						</h1>
						<p className="leading-none text-gray-400">
							Scalable Cloud
							<span className="block leading-none">
								Computing
							</span>
							<span className="block leading-none">Services</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Audible </h1>
						<p className="leading-none text-gray-400">
							Listen to Books &
							<span className="block leading-none">Original</span>
							<span className="block leading-none">Audio</span>
							<span className="block leading-none">
								Performances
							</span>
						</p>
					</div>
					<div className="w-29">
						<h1>Box Office Mojo </h1>
						<p className="leading-none text-gray-400">Find Movie</p>
						<p className="leading-none text-gray-400">
							Box Office Data
						</p>
					</div>
					<div className="w-29">
						<h1>Goodreads </h1>
						<p className="leading-none text-gray-400">
							Book reviews <span className="block">&</span>{" "}
							recommendations
						</p>
					</div>
					<div className="w-29">
						<h1>IMDb </h1>
						<p className="leading-none text-gray-400">
							Movies, TV{" "}
							<span className="block">& Celebrities</span>
						</p>
					</div>
				</div>
			</div>
			{/* Fifth layer */}
			<div className="flex justify-center space-x-5 bg-gray-900 brightness-70">
				<div>Conditions of Use</div>
				<div>Privacy Notice</div>
				<div>Consumer Health Data Privacy Disclosure</div>
				<div>Your Ads Privacy Choices</div>
			</div>
			<div className="flex justify-center space-x-5 bg-gray-900 brightness-70 pb-10">
				© 1996-2025, Amazon.com, Inc. or its affiliates
			</div>
		</div>
	);
}
