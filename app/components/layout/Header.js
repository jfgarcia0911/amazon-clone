import React from "react";
import Image from "next/image";
import { MapPin } from "lucide-react";
export default function Header() {
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
				<div className="flex flex-1 bg-white rounded-sm text-black items-center group">
               <div className="w-14 border-r flex justify-center border-gray-400 py-2">
                  <div className="text-gray-500 text-sm">All &#9662;</div>
               </div>
					<input type="text" placeholder="Search Amazon" className="outline-none focus:ring-2 focus:ring-yellow-500 text-black  py-2" />
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
