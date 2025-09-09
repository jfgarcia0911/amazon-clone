import React, { useRef, useState, useEffect } from "react";
import { Search } from "lucide-react";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { db } from "../../firebase/config.js";
import { useRouter } from "next/navigation.js";
export default function SearchBar() {
	const inputRef = useRef();
	const [categoryWidth, setCategoryWidth] = useState(60);
	const buttonRef = useRef();
    const router = useRouter();
	const [category, setCategory] = useState("All");
	const [open, setOpen] = useState(false);
	const dropdownRef = useRef();
	const categories = [
		"All Departments",
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
	const [products, setProducts] = useState([]);
	

	const handleCategory = (category) => {
		setCategory(category);
		setOpen(false);
	};

	const fetchProducts = async (selectedCategory) => {
		try {
			let q;
			if (inputRef.current.value) {
				// Filter by name

				q = query(
					collection(db, "amazon-products"),
					where("searchKeywords", "array-contains", inputRef.current.value.toLowerCase()),
                    orderBy("timestamps.createdAt", "desc"),
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
            router.push(`/search/products?category=${encodeURIComponent(selectedCategory)}&input=${inputRef.current.value}`);
		} catch (err) {
			console.error("Error fetching products:", err);
		}
	};

	// This effect runs whenever the 'category' value changes
	useEffect(() => {
		if (buttonRef.current) {
			const width = buttonRef.current.offsetWidth;
			setCategoryWidth(width);
		}
	}, [category]);

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target) &&
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target)
			) {
				setOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);
	return (
		<div className="relative flex flex-1 text-black   h-10">
			<form  onSubmit={(e) => {
    e.preventDefault();
    fetchProducts(category);
  }}  className="flex flex-1  bg-white rounded-sm focus-within:ring-3 focus-within:ring-yellow-500">
				<input
					ref={inputRef}
					type="text"
					placeholder="Search Amazon"
					className=" outline-none   text-black  py-2 flex flex-1"
					style={{
						paddingLeft: `${categoryWidth + 8}px`,
					}}
				/>
				<button
					type="submit"
					aria-label="Search Amazon"
					className="bg-orange-300 px-3 py-2 ml-auto rounded-r-sm hover:brightness-90"
				>
					<Search className="text-black cursor-pointer" size={25} />
				</button>
			</form>

			{/* Dropdown Button */}
			<button
				onClick={() => setOpen(!open)}
				ref={buttonRef}
				type="button"
				aria-label={`Search in ${category} category`}
				className="absolute h-10 px-2 space-x-1  text-gray-500 flex items-center justify-center  border-r border-gray-400 z-10 rounded-sm focus:ring-2 focus:ring-yellow-500 hover:text-black cursor-pointer"
			>
				<div className="text-sm ">{category}</div>
				{/* Arrow down */}
				<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray"></div>
			</button>

			{/* Dropdown menu */}
			{open && (
				<div
					ref={dropdownRef}
					className="absolute w-[210px] h-[400px] top-10 z-10 rounded-xs bg-white border border-gray-500 overflow-y-auto"
				>
					{categories.map((cat) => (
						<button
							key={cat}
							onClick={() => handleCategory(cat)}
							aria-label="Search in all categories"
							className="block text-sm  hover:bg-blue-500 hover:text-white w-full p-1 text-left"
						>
							{cat}
						</button>
					))}
				</div>
			)}
		</div>
	);
}
