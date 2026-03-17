"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/config";

export default function AccoutMenu({ user }) {
  console.log(user)
	const router = useRouter();

	const handleSignin = () => {
		router.push("/sign-in");
	};
	const handleSignup = () => {
		router.push("/sign-up");
	};

	const handleSwitchAccount = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			});
		localStorage.setItem("recentView", JSON.stringify([]));
		localStorage.setItem("relatedCategory", JSON.stringify(""));

		router.push("/sign-in");
	};
	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				console.log("User signed out");
			})
			.catch((error) => {
				console.error("Error signing out:", error);
			});
		localStorage.setItem("recentView", JSON.stringify([]));
		localStorage.setItem("relatedCategory", JSON.stringify(""));
	};

	return (
		<>
			<div className="hidden lg:flex relative space-x-1 items-center    group">
				<div className="text-xs leading-none border border-transparent  group-hover:border-white px-1 py-2 cursor-pointer">
					Helllo, {user ? user.displayName || user.email : `Sign in`}
					<span className="text-sm font-bold block">Account & Lists</span>
				</div>
				{/* Arrow Down */}
				<div className="relative border-l-4 border-t-4 border-r-4 border-l-transparent border-r-transparent cursor-pointer">
					{/* <!-- Triangle at the top --> */}
					<div className="absolute bg-white h-4 w-4 rotate-45 top-4 -left-2  hidden   group-hover:block "></div>
				</div>
				{/* Tooltip container */}
				<div className="absolute hidden   group-hover:block  bg-white w-150 h-60 top-12 -left-80 z-30 border border-gray-300 rounded-lg">
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
									<p className="text-sm text-gray-500">Account holder</p>
								</div>
							</div>
							<div className="text-blue-500 text-sm font-semibold pb-1  cursor-pointer">
								<span className="hover:border-b">Manage Profiles</span>{" "}
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
							<h1 className="font-bold text-black">Your Lists</h1>
							<div className="text-sm space-y-1 flex flex-col">
								<Link
									href={"/seller"}
									className="hover:underline hover:text-orange-500 cursor-pointer"
								>
									My products
								</Link>
								{user ? (
									<Link
										href={"/products/add"}
										className="hover:underline hover:text-orange-500 cursor-pointer"
									>
										Add product
									</Link>
								) : (
									""
								)}
							</div>
						</div>
						<div className=" w-full space-y-2">
							<h1 className="font-bold text-black">Your Account</h1>
							<div className="text-sm space-y-1">
								{user ? (
									<>
										<p
											onClick={handleSwitchAccount}
											className="hover:underline hover:text-orange-500 cursor-pointer"
										>
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
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex lg:hidden space-x-1 ml-auto mr-3 items-center cursor-pointer">
				{user ? (
					<h1>{user.displayName}</h1>
				) : (
					<>
						<h1>
							Sign in <span className="text-sm">{`>`}</span>
						</h1>
						<div className="w-8 ">
							<Image
								src="/user.png"
								width={40}
								height={40}
								alt="profile pic"
								priority
								className="object-contain rounded-full p-1 bg-white"
							/>
						</div>
					</>
				)}
			</div>
		</>
	);
}
