"use client";
import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // icons
import Image from "next/image";
import Link from "next/link";

export default function ProductOptions({images, title}) {
    const containerRef = useRef();


    // Scroll functions for arrows
	const scrollLeft = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: -500, behavior: "smooth" });
		}
		console.log(scrollLeft);
	};

	const scrollRight = () => {
		if (containerRef.current) {
			containerRef.current.scrollBy({ left: 500, behavior: "smooth" });
		}
	};

  return (
     <>
        {images && <div className="w-full  -mt-22 mb-20">
			<div className="max-w-[1520px] w-full  mx-auto">
				<div className="p-10 h-70 relative group">
					<div className="text-xl font-bold">
						{title}
					</div>
					<div ref={containerRef} className="flex overflow-hidden  ">
						{images.map((item) => {
							return (
								<Link
									href={`/products/${item.id}`}
									key={item.id}
									className="relative h-52 flex-shrink-0    cursor-pointer ml-8"
								>
									<Image
										src={item.mainImage}
										width={100}
                                        height={100}
										alt={item.name || 'alt name'}
										className="object-contain mt-1  h-52 w-50"
									/>
								</Link>
							);
						})}
					</div>
					{/* Left Arrow */}
					<div
						onClick={scrollLeft}
						className="absolute  opacity-0 group-hover:opacity-100 transition-opacity duration-1500 top-32 left-10 cursor-pointer w-10 h-20 border-b border-r rounded-sm border-gray-400 shadow-5xl flex items-center justify-center bg-white"
					>
						<ChevronLeft
							strokeWidth={2}
							size={35}
							className="text-gray-500"
						/>
					</div>
					{/* Right Arrow */}
					<div
						onClick={scrollRight}
						className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-1500 top-32 right-10 cursor-pointer w-10 h-20 border-b border-l rounded-sm border-gray-400 shadow-5xl flex items-center justify-center bg-white"
					>
						<ChevronRight
							strokeWidth={2}
							size={35}
							className="text-gray-500"
						/>
					</div>
				</div>
			</div>
		</div>}
		</>
  )
}
