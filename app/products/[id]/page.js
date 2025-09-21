"use client";
import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Image from "next/image";
import { useParams } from "next/navigation";
import Header from "../../components/layout/Header";
import { auth } from "../../firebase/config";
import { useRouter } from "next/navigation.js";

export default function ProductsById() {
	const params = useParams();
	const [productData, setProductData] = useState(null);
	const [imgUrls, setImgUrls] = useState();
	const [whole, setWhole] = useState("");
	const [decimal, setDecimal] = useState("");
	const [selectedQty, setSelectedQty] = useState(1);
	const user = auth.currentUser;
	const router = useRouter();

	const handleAddToCart = async (product) => {
		// Check user authentication
		if (!user) {
			alert("You must be signed in to add items to cart.");
			return;
		}
		const userId = user.uid;
		const cartItemRef = doc(db, "amazon-carts", userId, "items", params.id);
		try {
			const cartSnap = await getDoc(cartItemRef);

			if (cartSnap.exists()) {
				// 🔼 already in cart → increase quantity
				const currentQty = cartSnap.data().quantity;
				const price = cartSnap.data().price;
				const subTotal = cartSnap.data().subTotal;
				await updateDoc(cartItemRef, {
					quantity: currentQty + 1,
					subTotal: subTotal + price,
				});
			} else {
				// ➕ not in cart → add new item
				await setDoc(cartItemRef, {
					name: product.name,
					image: product.images?.mainImage,
					price: product.pricing.costPrice,
					description: product.description,
					stockQuantity: product.stockQuantity,
					subTotal: product.pricing.costPrice,
					createdAt: new Date(),
					quantity: 1,
				});
			}

			console.log("Added to cart:", product.name);
		} catch (err) {
			console.error("Error adding to cart:", err);
		}
		router.push("/cart");
	};

	useEffect(() => {
		const fetchProductData = async () => {
			if (params.id) {
				try {
					const docRef = doc(db, "amazon-products", params.id);
					const docSnap = await getDoc(docRef);

					if (docSnap.exists()) {
						setProductData(docSnap.data());
						const price = docSnap
							.data()
							.pricing.costPrice.toFixed(2); // always 2 decimals
						const [w, d] = price.split(".");
						setWhole(w);
						setDecimal(d);

						if(user){
							// These items will be shown as recent views on the homepage.
						const storedItems =
							JSON.parse(localStorage.getItem("recentView")) ||
							[];

						const newItem = {
							id: params.id,
							mainImage: docSnap.data().images.mainImage,
							name: docSnap.data().name
						};

						// Check if item already exists
						const exists = storedItems.some(
							(item) => item.id === newItem.id
						);

						let updatedItems = storedItems;
						if (!exists) {
							updatedItems = [newItem, ...storedItems];
							localStorage.setItem(
								"recentView",
								JSON.stringify(updatedItems)
							);
						}
						}

					} else {
						console.log("No such document!");
					}
				} catch (error) {
					console.error("Error fetching product:", error);
				}
			}
		};

		fetchProductData();
	}, [params.id]); // Add productId as a dependency

	const handleClick = (url) => {
		setImgUrls(url);
	};
	return (
		<>
			<Header />
			{productData && (
				<div className="flex  justify-center mt-25">
					{/* Side Images */}
					<div className="py-5 space-y-2 space-x-2">
						<div className="relative border border-gray-300 w-10 rounded-sm ">
							<Image
								onClick={() =>
									handleClick(productData.images?.mainImage)
								}
								src={
									productData.images?.mainImage ||
									"/amazon.png"
								}
								alt={productData.name}
								width={50}
								height={50}
								className=" h-10"
							/>
						</div>

						{productData.images?.additionalImages?.map(
							(imgUrl, index) => (
								<div
									onClick={() => handleClick(imgUrl)}
									key={index}
									className="border border-gray-300 w-10 rounded-sm p-.5"
								>
									<Image
										src={imgUrl}
										alt={productData.name}
										width={50}
										height={50}
										className="h-10"
									/>
								</div>
							)
						)}
					</div>
					{/* Main Image */}
					<div className="w-120 py-5">
						<Image
							src={
								imgUrls ||
								productData.images?.mainImage ||
								"/amazon.png"
							}
							alt={productData.name}
							width={500}
							height={500}
						/>
					</div>
					{/* Product Details */}
					<div className="w-160 py-5 ml-10 space-y-5">
						{/* Product Name */}
						<div className="text-2xl line-clamp-2 md:line-clamp-4 overflow-hidden h-20 md:h-36 border-b border-gray-300 pb-4 pt-2">
							{productData.name}
						</div>
						{/* Price */}
						<div className="text-sm relative border-b border-gray-300 pb-4">
							{" "}
							<span className="absolute top-0.5">$</span>{" "}
							<span className="text-3xl ml-2">{whole}</span>
							<span className="absolute top-0.5">{decimal}</span>
						</div>
						<div className="text-xl   border-b border-gray-300 pb-4 pt-2">
							<div className="mb-1 font-semibold">
								About this item
							</div>
							{/* Product Descriptions */}
							<div className="ml-5 text-gray-800">
								<ul className="list-disc ">
									{productData.description.map(
										(keyword, index) => (
											<li
												key={index}
												className="text-sm "
											>
												<div className="line-clamp-3 hover:line-clamp-none">
													{keyword}
												</div>
											</li>
										)
									)}
								</ul>
							</div>
						</div>
					</div>
					{/* Add to Cart & Buy option */}
					<div className="w-60 h-100 p-3 pl-4 border border-gray-300 ml-10 rounded-lg">
						{/* Price */}
						<div className="text-sm relative">
							{" "}
							<span className="absolute top-0.5">$</span>{" "}
							<span className="text-3xl ml-2">{whole}</span>
							<span className="absolute top-0.5">{decimal}</span>
						</div>
						{/* Stock Status */}
						<div
							className={`${
								productData.stockQuantity
									? "text-green-700"
									: "text-red-700"
							}  text-xl my-3`}
						>
							{" "}
							{productData.stockQuantity
								? "In Stock"
								: "Out of Stock"}
						</div>
						{/* Quantity */}
						<div className="border border-gray-300 h-8 text-sm w-full px-2 rounded-lg relative">
							{/* Show text on top of select */}
							<span className="absolute left-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-700">
								Quantity: {selectedQty}
							</span>

							<select
								value={selectedQty}
								onChange={(e) =>
									setSelectedQty(Number(e.target.value))
								}
								className="w-full  h-8 opacity-0 absolute left-0 top-0 cursor-pointer"
							>
								{Array.from({ length: 30 }, (_, i) => (
									<option key={i + 1} value={i + 1}>
										{i + 1}
									</option>
								))}
							</select>
						</div>
						{/* Buttons/Actions */}
						<div className="mt-4 space-y-2 text-sm">
							<button
								onClick={() => handleAddToCart(productData)}
								className="bg-yellow-300 w-full  px-2 py-1  rounded-xl cursor-pointer"
							>
								Add to Cart
							</button>
							<button className="bg-yellow-500 w-full px-2 py-1 rounded-xl cursor-pointer">
								Buy Now
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
