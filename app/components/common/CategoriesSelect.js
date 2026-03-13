import React from "react";

const categories = [
	"Arts & Crafts",
	"Automotive",
	"Baby",
	"Beauty & Personal Care",
	"Books",
	"Boy's Fashion",
	"Computers",
	"Deals",
	"Digital Music",
	"Electronics",
	"Girl's Fashion",
	"Health & Household",
	"Home Kitchen",
	"Industrial Scientific",
	"Kindle Store",
	"Luggage",
	"Men's Fashion",
	"Movies & TV",
	"Music, CD's & Vinyl",
	"Pet Supplies",
	"Prime Video",
	"Software",
	"Sports Outdoor",
	"Tools & Home Improvement",
	"Toys and Games",
	"Video Games",
	"Women's Fashion",
];

export default function CategoriesSelect({onSelect}) {
	return (
		
		<div className="py-1 max-h-60 overflow-y-auto">
			{categories.map((category) => (
				<button
					key={category}
					onClick={() => onSelect(category)}
					className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 `}
					role="menuitem"
					tabIndex={0}
				>
					{category}
				</button>
			))}
		</div>
	);
}
