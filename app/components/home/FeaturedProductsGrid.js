import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function FeaturedProductsGrid() {
	const router = useRouter();
const productGallery = [
	{
		title: "FREE Shipping to Philippines",

		image: [{ img: "/free-shipping.png", link: "" }],
		link: "Learn more",
	},
	{
		title: "9.9 Super Shopping Day",
		image: [{ img: "/super-shopping-day.png", link: "" }],
		link: "Explore deals",
	},
	{
		title: "Free Shipping Zone",
		image: [{ img: "/shipping-zone.png", link: "" }],
		link: "Shop now",
	},
	{
		title: "Shop for your home essentials",
		image: [
			{ img: "/cleaning-tools.png", link: "Cleaning Tools" },
			{ img: "/home-essentials.png", link: "Home Storage" },
			{ img: "/home-decor.png", link: "Home Decor" },
			{ img: "/bedding.png", link: "Bedding" },
		],
		link: "Discover more in Home",
		category: 'Health & Household'
	},
	{
		title: "Get your game on",
		image: [{ img: "/game-on.png", link: "" }],
		link: "Shop gaming",
		category: 'Computers'
	},
	{
		title: "Top categories in Kitchen appliances",
		image: [
			{ img: "/kitchen-appliances.png", link: "Cooker" },
			{ img: "/coffee.png", link: "Coffee" },
			{ img: "/pots-pans.png", link: "Pots and Pans" },
			{ img: "/kettle.png", link: "Kettle" },
		],
		link: "Explore all products in Kitchen",
		category: 'Home Kitchen'
	},
	{
		title: "Refresh your space",
		image: [
			{ img: "/dining.png", link: "Dining" },
			{ img: "/home.png", link: "Home" },
			{ img: "/kitchen.png", link: "Kitchen" },
			{ img: "/beauty.png", link: "Health & Beauty" },
		],
		link: "See more",
	},
	{
		title: "Shop Fashion for less",
		image: [
			{ img: "/jeans.png", link: "Jeans under $50" },
			{ img: "/tops.png", link: "Tops inder $25" },
			{ img: "/dress.png", link: "Dress under $30" },
			{ img: "/shoes.png", link: "Shoes under $50" },
		],
		link: "See all deals",
	},
];

	// router.push(`/search/products?category=${encodeURIComponent(selectedCategory)}&input=${inputRef.current.value}
	return (
		<div className="relative w-full  min-h-[600px] font-sans ">
			<div className="absolute -top-89 left-0 w-full ">
				<div className="max-w-380 mx-auto ">
					<div className="grid  grid-cols-3 xl:grid-cols-4 gap-5 px-5   ">
						{productGallery.map((prod, index) => {
							return (
								<div
									key={index}
									className={`bg-white h-105 p-5 flex flex-col ${index === productGallery.length -2 && 'hidden'} ${index === productGallery.length -1 && 'hidden'} xl:flex `}
								>
									<div className="text-xl font-[700] pb-2 truncate">
										{prod.title}
									</div>
									<div
										className={`relative grid h-full gap-5 ${
											prod.image.length > 1
												? "grid-cols-2"
												: "grid-cols-1"
										}`}
									>
										{prod.image.map((img, index) => {
											return (
												<Link
												href={`/search/products?category=${encodeURIComponent(prod.category || 'All')}&input=${''}`} 
													key={index}
													className="flex flex-col"
												>
													<div className="relative w-full flex-grow">
														<Image
															src={img.img}
															fill
															alt="free shipping image"
															className="object-cover flex-shrink-0"
														/>
													</div>
													<div className="text-sm truncate">
														{img.link}
													</div>
												</Link>
											);
										})}
									</div>
									<Link 
									href={`/search/products?category=${encodeURIComponent(prod.category || 'All')}&input=${''}`} 
									className="truncate mt-auto pt-5 text-sm text-blue-500 hover:text-blue-800 cursor-pointer">
										{prod.link}
									</Link>
								</div>
							);
						})}
					</div>
				</div>

			</div>
		</div>
	);
}
