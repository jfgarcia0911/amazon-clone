import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons

export default function ProductGallery() {
	const containerRef = useRef();
	const [images, setImages] = useState([
		{ img: "/av1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/av1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/av1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/av1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/av1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/c1.png", size: null },
		{ img: "/c1.png", size: null },
	]);

	useEffect(() => {
		images.forEach((item, index) => {
			const img = new window.Image();
			img.src = item.img;

			img.onload = () => {
				setImages((prevImages) => {
					const newImages = [...prevImages];
					newImages[index] = {
						...newImages[index],
						size: { width: img.width, height: img.height },
					};
					return newImages;
				});
			};
		});
	});

    // Scroll functions for arrows
	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: -500, behavior: 'smooth' });
		}
		console.log(scrollLeft)
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: 500, behavior: 'smooth' });
		}

	};

	return (
		<div className="w-full  -mt-24">
			<div className="max-w-[1520px] w-full  mx-auto">
				<div className="p-10 h-70 relative group">
					<div className="text-xl font-bold">
						More top picks for you
					</div>
					<div ref={containerRef} className="flex overflow-hidden  ">
						{images.map((item, index) => {
							return (
								<Link
									href={"/"}
									key={index}
									className="relative h-52 flex-shrink-0   cursor-pointer ml-8"
									style={{
										width: `${item.size?.width || 50}px`,
									}}
								>
									<Image
										src={item.img}
										fill
										alt="free shipping image"
										className="object-cover mt-1"
									/>
								</Link>
							);
						})}
					</div>
					{/* Left Arrow */}
					<div onClick={scrollLeft} className="absolute  opacity-0 group-hover:opacity-100 transition-opacity duration-1500 top-32 left-10 cursor-pointer w-10 h-20 border-b border-r rounded-sm border-gray-400 shadow-5xl flex items-center justify-center bg-white">
						<ChevronLeft
							strokeWidth={2}
							size={35}
							className="text-gray-500"
						/>
					</div>
					{/* Right Arrow */}
					<div onClick={scrollRight} className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1500 top-32 right-10 cursor-pointer w-10 h-20 border-b border-l rounded-sm border-gray-400 shadow-5xl flex items-center justify-center bg-white">
						<ChevronRight
							strokeWidth={2}
							size={35}
							className="text-gray-500"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
