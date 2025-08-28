'use client'
import React, {useRef}from "react";
import Image from "next/image";
import { MapPin, Search,ChevronDown } from "lucide-react";


export default function Header() {
   const inputRef = useRef()

   const handleClick = () => {
      const value = inputRef.current.value

      console.log(value)
   }
	return (
		<header className="bg-gray-900  text-white ">
			<div className="flex items-center  justify-between px-5 py-1  space-x-5 h-16">
				{/* Logo */}
				<div className="flex items-center ">
					<Image
						src="/amazon.png"
						alt="Logo"
						width={100}
						height={40}
						className="object-contain"
					/>
				</div>

				{/* Deliver To */}
				<div className="flex relative space-x-1 items-center w-24">
					<MapPin size={40} className=" " />
					<div className="text-xs leading-none">
						Deliver to{" "}
						<span className="text-sm font-bold">Philippines</span>
					</div>
				</div>

				{/* Search Bar */}
				<div className="flex flex-1 bg-white rounded-sm text-black items-center  focus-within:ring-3 focus-within:ring-yellow-500">
					{/* Dropdown (All) */}
					<button className="w-16 text-gray-500  border-r flex rounded-sm items-center space-x-1 justify-center border-gray-400 py-2 focus:ring-3 focus:ring-yellow-500 focus-within:ring-0">
						<span className="text-gray-500 text-sm">
							All 
						</span>
                  <ChevronDown size={20}/>
					</button>
					{/* Input */}
					<input
               ref={inputRef}
						type="text"
						placeholder="Search Amazon"
						className="peer outline-none  text-black pl-2  py-2"
					/>
					{/* Magnifying glass button */}
					<button
                  onClick={handleClick}
						type="button"
						className="bg-yellow-300 px-3 py-2 ml-auto rounded-r-sm hover:bg-yellow-400"
					>
						<Search className="text-black" size={25} />
					</button>
				</div>

				<div>En</div>
				<div className="flex flex-row ">
					<div>d</div>
					<div>d</div>
				</div>
				<div>Returns Orders</div>
				<div>Cart</div>
			</div>
		</header>
	);
}
