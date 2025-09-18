"use client";
import React, { useState, useRef, useEffect } from "react";
import { Menu } from "lucide-react";
import Image from "next/image";
export default function SecondaryNav() {
	const [isVisible, setIsVisible] = useState("up");
	const lastScrollY = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			// setScrollY(currentScrollY);

			// Determine scroll direction
			if (currentScrollY <= 100) {
				setIsVisible("up");
			} else  {
				setIsVisible("down");
			} 
			// Update the ref with current position for next comparison
			lastScrollY.current = currentScrollY;
		};
		window.addEventListener("scroll", handleScroll);
		// Cleanup the event listener when the component unmounts
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount
	return (
		<div className={`bg-gray-700 text-white font-sans fixed top-16 w-full z-45  ${
          isVisible === 'up' ? 'translate-y-0' : '-translate-y-50'
        }`}>
			<div className="flex justify-between items-center px-5 h-[40px]  text-nowrap">
				<div className="flex space-x-2 items-center justify-center  font-semibold text-sm ">
					<div className="flex items-center space-x-1  py-2 px-2 border border-transparent  hover:border-white cursor-pointer">
						<Menu size={24} />
						<div>All</div>
					</div>
					<div className="flex items-center space-x-1 w-[80px]  p-1 px-2 rounded-2xl bg-white cursor-pointer">
						<Image
							src={"/rufus-ai-icon.png"}
							alt="rufus ai icon"
							width={15}
							height={15}
						/>
						<h1 className="text-black ">Rufus</h1>
					</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Free Shipping Zone
					</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">{`Today's Deals`}</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Prime Video
					</div>
					<div className="flex items-center  py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Buy Again
					</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Customer Service
					</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Registry
					</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Gift Cards
					</div>
					<div className="flex items-center   py-2 px-2 border border-transparent  hover:border-white cursor-pointer ">
						Sell
					</div>
				</div>

				<div className="flex items-center w-[250px]  py-2 px-2 border border-transparent  hover:border-white cursor-pointer  font-semibold text-sm">
					Get free shipping to Philippines
				</div>
			</div>
		</div>
	);
}
