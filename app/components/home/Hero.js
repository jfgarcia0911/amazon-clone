"use client";
import React, { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel";
import FeaturedProductsGrid from "./FeaturedProductsGrid";
import ProductGallery from "./ProductGallery";
import ProductOptions from "./ProductOptions";
export default function Hero() {
	const [images, setImages] = useState([]);

	useEffect(() => {
		// Retrieve recently viewed items from localStorage
		const storedItems = JSON.parse(localStorage.getItem("recentView"));
		setImages(storedItems.slice(0, 20));
	}, []);
	return (
		<div className="flex flex-col mt-26">
			<ProductCarousel />
			<FeaturedProductsGrid />
			<ProductGallery />
			<ProductOptions images={images} title={"Recent view items"} />
		</div>
	);
}
