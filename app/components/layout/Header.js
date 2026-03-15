"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import SearchBar from "./SearchBar";
import { MapPin, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext ";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import { Menu } from "lucide-react";
import Link from "next/link";
import useScrollDirection from "../../hooks/useScrollDirection";
import useCartQuantity from "../../hooks/useCartQuantity";
import Logo from "../header/Logo"
import DeliverTo from "../header/DeliverTo"
import LanguageSelector from "../header/LanguageSelector"
import AccoutMenu from "../header/AccoutMenu"
import CartIcon from "../header/CartIcon"

export default function Header() {
	const { user } = useAuth();
	const isVisible = useScrollDirection();
		
	return (
		<div>
			<div
				className={`bg-gray-900 fixed z-50 top-0 text-white text-nowrap w-full  ${
					isVisible === "up" ? "translate-y-0" : "-translate-y-full"
				}`}
			>
				<div
					className={`flex flex-wrap  items-center  justify-between px-5 py-1  space-x-3 `}
				>
					<Menu className="text-white cursor-pointer" size={30} />

					{/* Logo */}
          <Logo/>
					
					{/* Deliver To */}

          <DeliverTo/>
					{/* Search Bar */}
					<div className="lg:flex hidden flex-1">
						<SearchBar />
					</div>

					{/* Language */}
          <LanguageSelector user={user}/>
					
					{/* Hello Sign in */}
          <AccoutMenu user={user}/>
					
					{/* Returns & Orders				 */}
					<div className="flex relative space-x-1 items-center w-18 border border-transparent  hover:border-white px-1 py-2 cursor-pointer">
						<div className="text-xs leading-none">
							Returns{"    "}
							<span className="text-sm block font-bold">& Orders</span>
						</div>
					</div>

					{/* Cart */}
          <CartIcon user={user}/>
					
					<div className="flex lg:hidden w-full">
						<SearchBar />
					</div>
				</div>
			</div>
		</div>
	);
}
