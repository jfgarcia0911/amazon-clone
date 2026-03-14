"use client";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/config";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext ";
import Link from "next/link";
import { toast } from "react-toastify";
import { Loader2, Pencil } from "lucide-react";
import { useProductForm } from "../hooks/useProductForm";

export default function SellerPage() {
	const { user } = useAuth();
	const [isLoading, setIsLoading] = useState(null);
	const { products, fetchSellerProducts, handleDelete } = useProductForm();

	useEffect(() => {
		if (user) {
			fetchSellerProducts(user.uid);
		}
	}, [user, fetchSellerProducts]);

	return (
		<div className="overflow-hidden">
			<Header />
			{products.length === 0 ? (
				<p className="text-3xl font-bold mb-4 p-10 mt-20">
					No available product yet.
				</p>
			) : (
				<div className="mt-20 justify-center items-center xl:items-start max-w-screen flex flex-col xl:flex-row">
					<div className="space-y-4 px-10  ">
						<h1 className="text-3xl mt-5  mb-4">My Products</h1>
						<div className=" m-0 lg:w-200 xl:w-240 2xl:w-290 flex px-5 text-gray-500 text-sm top-auto"></div>
						<div className="border border-gray-300 mb-4 flex flex-col lg:w-200 xl:w-240 2xl:w-290  rounded-lg">
							{products.map((item) => {
								// Only render items with quantity >= 1
								if (item.stockQuantity < 1) return null;
								const price = item.pricing.costPrice.toFixed(2); // always 2 decimals
								const [whole, decimal] = price.split(".");
								return (
									<div
										className={`flex w-full p-5 space-x-5 ${isLoading === item.id && "opacity-50"}`}
										key={item.id}
									>
										{/* Image */}
										<Link
											href={`/products/${item.id}`}
											className="w-50  items-center justify-center hidden md:block"
										>
											<Image
												src={item.images?.mainImage}
												alt={item.name}
												width={50}
												height={50}
												className="object-contain  w-[200px] h-[128px] p-1"
											/>
										</Link>

										{/* Description */}
										<div className="space-y-1  ">
											<Link
												href={`/products/${item.id}`}
												className=" md:w-80 lg:w-100 xl:w-150  2xl:w-180 line-clamp-2"
											>
												<h2 className="font-medium text-lg">{item.name}</h2>
											</Link>
											<div>
												<p
													className={`${
														item.stockQuantity
															? "text-green-700"
															: "text-red-700"
													} text-xs`}
												>
													Stock remaining:
													{item.stockQuantity}
												</p>
											</div>

											{/* Update Delete Button */}
											<div
												className={`flex px-3 border-3 font-bold border-yellow-300 rounded-xl w-22 items-center justify-between mt-3 h-8`}
											>
												<Link
													href={`/seller/edit/${item.id}`}
													className="ml-2 self-center"
												>
													<Pencil
														size={16}
														strokeWidth={4}
														className=" hover:text-blue-600"
													/>
												</Link>
												<button
													onClick={() => handleDelete(item.id)}
													className={`cursor-pointer `}
												>
													<Trash
														size={16}
														strokeWidth={3}
														className=" hover:text-red-600"
													/>
												</button>
											</div>
										</div>

										{/* Price */}
										<div className="ml-auto relative px-5 font-bold">
											<span className="absolute top-0.75 text-xs">$</span>
											<span className="text-xl ml-2">{whole}</span>
											<span className="absolute top-0.75 text-xs">
												{decimal}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
