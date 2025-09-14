"use client";
import { useSearchParams } from "next/navigation";
import {
	collection,
	getDocs,
	query,
	where,
	orderBy,
	doc,
	setDoc,
	getDoc,
	updateDoc 
} from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { useRouter } from "next/navigation.js";
import Header from "../../components/layout/Header";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext ";

export default function SearchProductsPage() {
	const { user } = useAuth();

	const searchParams = useSearchParams();
	const [products, setProducts] = useState([]);
	const category = searchParams.get("category");
	const input = searchParams.get("input");
	const router = useRouter();
	const [sortOption, setSortOption] = useState("newest");
	useEffect(() => {
		if (category !== null || input !== null) {
			fetchProducts(category, input);
		}
	}, [category, input]);

	const fetchProducts = async (selectedCategory, searchInput) => {
		try {
			let q;
			if (searchInput) {
				// Filter by keywords
				q = query(
					collection(db, "amazon-products"),
					where(
						"searchKeywords",
						"array-contains",
						searchInput.toLowerCase()
					),
					orderBy("timestamps.createdAt", "desc")
				);
			} else if (
				selectedCategory == "All Departments" ||
				selectedCategory == "All"
			) {
				// No filter, fetch everything
				q = collection(db, "amazon-products");
			} else {
				// Filter by category
				q = query(
					collection(db, "amazon-products"),
					where("category", "==", selectedCategory)
				);
			}
			const querySnapshot = await getDocs(q);
			const items = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setProducts(items);
			console.log(items);
		} catch (err) {
			console.error("Error fetching products:", err);
		}
	};

	const sortedProducts = [...products].sort((a, b) => {
		if (sortOption === "lowest")
			return a.pricing.costPrice - b.pricing.costPrice;
		if (sortOption === "highest")
			return b.pricing.costPrice - a.pricing.costPrice;
		if (sortOption === "newest") {
			return (
				b.timestamps.createdAt.toDate() -
				a.timestamps.createdAt.toDate()
			);
		}
		return 0;
	});

	const handleAddToCart = async (e, product) => {
		e.preventDefault(); // prevent link navigation
		e.stopPropagation(); // stop bubbling up to <Link>
		// Check user authentication
		if (!user) {
			alert("You must be signed in to add items to cart.");
			return;
		}

		const userId = user.uid;
		const cartItemRef = doc(db,"amazon-carts",userId,"items",product.id	);
		console.log(product);

		try {
			const cartSnap = await getDoc(cartItemRef);

			if (cartSnap.exists()) {
				// 🔼 already in cart → increase quantity
				const currentQty = cartSnap.data().quantity || 1;
				await updateDoc(cartItemRef, {
					quantity: currentQty + 1,
				});
			} else {
				// ➕ not in cart → add new item
				await setDoc(cartItemRef, {
					name: product.name,
					image: product.images?.mainImage,
					price: product.pricing.costPrice,
					description: product.description,
					createdAt: new Date(),
					quantity: 1,
				});
			}

			console.log("Added to cart:", product.name);
		} catch (err) {
			console.error("Error adding to cart:", err);
		}
	};

	return (
		<div>
			<Header />

			<div className="flex items-center justify-between px-10 md:px-20  lg:px-30 xl:px-40 2xl:px-80 w-full h-10  border-b shadow-sm border-gray-300 text-xs">
				<div>
					{products.length} results for{" "}
					<span className="text-orange-700">{`"${
						input ? input : category
					}"`}</span>
				</div>
				<select
					className=" border border-gray-300 py-1 px-2 rounded-lg"
					value={sortOption}
					onChange={(e) => setSortOption(e.target.value)}
				>
					<option value="lowest">
						Sort by: Price: Lowest to Highest
					</option>
					<option value="highest">
						Sort by: Price: Highest to Lowest
					</option>
					<option value="newest">Sort by: Newest Arrivals</option>
				</select>
			</div>

			<div className="px-10 md:px-20  lg:px-30 xl:px-40 2xl:px-80 ">
				<h1 className="font-bold ">Results</h1>
				<p className="text-xs text-gray-500 text-nowrap">
					Check each product page for other buying options. Price and
					other details may vary based on product size and color.
				</p>
			</div>

			<div>
				<div className="grid grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5  gap-5 px-10 md:px-20  lg:px-30 xl:px-40 2xl:px-80 ">
					{sortedProducts.map((product) => {
						const price = product.pricing.costPrice.toFixed(2); // always 2 decimals
						const [whole, decimal] = price.split(".");
						return (
							<Link
								href={`/products/${product.id}`}
								key={product.id}
								className=" h-80 p-1 "
							>
								<div className="relative  h-50 flex mb-2">
									<Image
										src={product.images?.mainImage}
										alt={product.name}
										fill
										className="object-contain shrink "
									/>
								</div>
								<div className="text-sm  line-clamp-2 hover:text-orange-500 hover:underline">
									{product.name}
								</div>
								<div className="text-xs relative">
									{" "}
									<span className="absolute top-1">
										$
									</span>{" "}
									<span className="text-2xl ml-2">
										{whole}
									</span>
									<span className="absolute top-1">
										{decimal}
									</span>
								</div>
								<button
									onClick={(event) =>
										handleAddToCart(event, product)
									}
									className="text-xs bg-yellow-300 px-3 py-1 rounded-2xl cursor-pointer"
								>
									Add to cart
								</button>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
