"use client";
import React, { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import FeaturedProductsGrid from "./FeaturedProductsGrid";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config.js";

export default function Hero() {
	const [recentItems, setRecentItems] = useState([]);
	const [relatedItems, setRelatedItems] = useState([]);

	useEffect(() => {
		// Retrieve recently viewed items from localStorage
		const storedItems = JSON.parse(localStorage.getItem("recentView"));
		setRecentItems(storedItems.slice(0, 20));

		const relatedItems = JSON.parse(
			localStorage.getItem("relatedCategory")
		);

		
		const fetchProductsByCategory = async (cat) => {
			try {
				const q = query(
					collection(db, "amazon-products"),
					where("category", "==", cat),
					orderBy("timestamps.createdAt", "desc")
				);
				const querySnapshot = await getDocs(q);
				const items = querySnapshot.docs.map((doc) => ({
					id: doc.id,
					name: doc.data().name,
					mainImage: doc.data().images.mainImage,
				}));
				console.log(items);
				setRelatedItems(items)
			} catch (err) {
				console.error("Error fetching products:", err);
			}
		};

		if (relatedItems) {
			fetchProductsByCategory(relatedItems);
		}
	}, []);

	return (
		<div className="flex flex-col mt-26">
			<ProductCarousel />
			<FeaturedProductsGrid />
			<ProductGallery />
			<ProductOptions
				images={recentItems}
				title={"Recent viewed items"}
			/>
			<ProductOptions
				images={relatedItems}
				title={"Related to items you've viewed"}
			/>
		</div>
	);
}
