"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons
import Image from "next/image";

const items = [
	"/image1.jpg",
	"/image2.jpg",
	"/image3.jpg",
	"/image4.jpg",
	"/image5.jpg",
	"/image6.jpg",
];

export default function ProductCarousel() {
	const [current, setCurrent] = useState(0);

	const prevSlide = () => {
		setCurrent((prev) => (prev === 0 ? items.length - 1 : prev - 1));
	};
	const nextSlide = () => {
		setCurrent((prev) => (prev === items.length - 1 ? 0 : prev + 1));
	};

	// Auto-slide every 5 seconds
	useEffect(() => {
		const timer = setInterval(() => {
			setCurrent((prev) => (prev + 1) % items.length);
		}, 5000);
		return () => clearInterval(timer);
	}, []);

	return (
		<div className=" flex items-center justify-center">
			<div className="relative w-380 h-150 overflow-hidden">
				<div
					style={{ transform: `translateX(-${current * 100}%)` }}
					className="flex transition-transform duration-500"
				>
					{items.map((img, index) => (
						<div
							key={index}
							className="relative w-full h-[600px] flex-shrink-0"
						>
							<Image
								src={img}
								fill
								alt="story image"
								sizes="(max-width: 768px) 100vw, 33vw"
								className="object-cover"
							/>
						</div>
					))}
				</div>

				{/* Gradient Overlay at bottom */}
				<div className="absolute bottom-0 left-0 w-full h-100 bg-gradient-to-t from-gray-100 via-transparent to-transparent"></div>

				{/* Left Arrow */}
				<ChevronLeft
					onClick={prevSlide}
					className="absolute top-20 left-0  cursor-pointer"
					strokeWidth={0.6}
					size={70}
				/>
				{/* Right Arrow */}
				<ChevronRight
					onClick={nextSlide}
					className="absolute top-20 right-0  cursor-pointer"
					strokeWidth={0.6}
					size={70}
				/>
			</div>
		</div>
	);
}
