"use client";

import Header from "../../components/layout/Header";
import React, { useRef, useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext ";
import { useRouter } from "next/navigation";

export default function AddProduct() {
	const { user } = useAuth();
	const mainImageRef = useRef();
	const buttonDropdownRef = useRef();
	const dropdownRef = useRef();
	const inputDetailsRef = useRef();
	const inputKeywordsRef = useRef();
	const router = useRouter();

	const [open, setOpen] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);
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
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		description: [],
		attributes: {
			brand: "",
			color: "",
			model: "",
			material: "",
		},
		category: "All",
		searchKeywords: [],
		images: {
			mainImage: "",
			additionalImages: [],
		},
		pricing: {
			currency: "USD",
			costPrice: 0,
		},
		stockQuantity: 0,
		timestamps: {
			createdAt: new Date(),
			updatedAt: new Date(),
		},
	});

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [id]: value }));

		if (errors[id]) {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
		}
	};

	const handleChangeAttribute = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			attributes: {
				...prevData.attributes,
				[id]: value,
			},
		}));

		if (errors[id]) {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
		}
	};
	const handleChangePricing = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			pricing: {
				...prevData.pricing,
				[id]: Number(value),
			},
		}));
		if (errors[id]) {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
		}
	};
	const handleChangeImages = async (e) => {
		const { id, value } = e.target;
		const file = e.target.files[0];
		if (file) {
			// Post image to Pinata and get Url
			const data = new FormData();
			data.set("file", file);
			const response = await fetch("/api/files", {
				method: "POST",
				body: data,
			});

			const imgUrl = await response.json();
			console.log(imgUrl);

			setFormData((prevData) => ({
				...prevData,
				images: {
					...prevData.images,
					[id]: imgUrl,
				},
			}));
		} else {
			setFormData((prevData) => ({
				...prevData,
				images: {
					...prevData.images,
					[id]: "",
				},
			}));
		}
		if (errors[id]) {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
		}
	};

	const handleSelect = (cat) => {
		setFormData((prev) => ({ ...prev, category: cat }));
		if (errors.category) {
			setErrors((prevErrors) => ({ ...prevErrors, category: "" }));
		}

		setOpen(false);
	};

	const handleChangeAddImages = async (e, index) => {
		// setIsPosting(true);
		const file = e.target.files[0];
		if (file) {
			// Post image to Pinata and get Url
			const data = new FormData();
			data.set("file", file);
			const response = await fetch("/api/files", {
				method: "POST",
				body: data,
			});

			const imgUrl = await response.json();
			console.log(imgUrl);

			setFormData((prev) => {
				const newImages = [...prev.images.additionalImages];
				newImages[index] = imgUrl; // replace or set at index
				return {
					...prev,
					images: {
						...prev.images,
						additionalImages: newImages,
					},
				};
			});
		} else {
			setFormData((prev) => {
				const newImages = [...prev.images.additionalImages];
				newImages[index] = ""; // replace or set at index
				return {
					...prev,
					images: {
						...prev.images,
						additionalImages: newImages,
					},
				};
			});
		}

		// Clear error for this specific input
		const errorKey = `additionalImages-${index}`;
		if (errors[errorKey]) {
			setErrors((prevErrors) => ({
				...prevErrors,
				[errorKey]: "",
			}));
		}
	};

	const handleConfirmDescription = (e) => {
		e.preventDefault();
		const detail = inputDetailsRef.current.value;

		if (detail.trim()) {
			setFormData((prev) => ({
				...prev,
				description: [...prev.description, detail.trim()],
			}));
		}
		if (errors.description) {
			setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
		}
		console.log("Detail confirmed:", formData.description);
		inputDetailsRef.current.value = "";
	};
	const handleConfirmKeywords = (e) => {
		e.preventDefault();
		const key = inputKeywordsRef.current.value;

		if (key.trim()) {
			setFormData((prev) => ({
				...prev,
				searchKeywords: [...prev.searchKeywords, key.trim()],
			}));
		}
		if (errors.searchKeywords) {
			setErrors((prevErrors) => ({ ...prevErrors, searchKeywords: "" }));
		}
		console.log("Detail confirmed:", formData.searchKeywords);
		inputKeywordsRef.current.value = "";
	};
	const addImageInput = (e) => {
		setFormData((prev) => ({
			...prev,
			images: {
				...prev.images,
				additionalImages: [...prev.images.additionalImages, ""],
			},
		}));
	};

	const removeImageInput = (e) => {
		setFormData((prev) => ({
			...prev,
			images: {
				...prev.images,
				additionalImages: prev.images.additionalImages.slice(0, -1),
			},
		}));
	};
	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Product name is required";
		}
		if (!formData.description.length) {
			newErrors.description = "Product description is required";
		}
		if (!formData.attributes.brand.trim()) {
			newErrors.brand = "Product brand is required";
		}
		if (formData.category === "All") {
			newErrors.category = "Choose a category";
		}
		if (!formData.searchKeywords.length) {
			newErrors.searchKeywords = "Atleast one search keywords are required";
		}
		if (!formData.pricing.costPrice || formData.pricing.costPrice <= 0) {
			newErrors.costPrice = "Cost price must be greater than zero";
		}
		if (formData.stockQuantity < 0) {
			newErrors.stockQuantity = "Stock quantity cannot be negative";
		}
		if (!formData.images.mainImage) {
			newErrors.mainImage = "Main image is required";
		}
		if (
			formData.images.additionalImages.some((img) => !img) // one of them is empty
		) {
			newErrors.additionalImages = "Removed or provide additional images";
		}
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};
	// Submit form to Firestore
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (validateForm()) {
			setIsSubmitting(true);
			// Handle form submission logic here
			console.log("Form submitted:", formData);
			// TODO: Handle form submission (e.g., send data to API)
			try {
				//Save products to Firestore
				await addDoc(collection(db, "amazon-products"), {
					userId: user.uid,
					name: formData.name,
					description: formData.description,
					attributes: {
						brand: formData.attributes.brand,
						color: formData.attributes.color,
						model: formData.attributes.model,
						material: formData.attributes.material,
					},
					category: formData.category,
					searchKeywords: formData.searchKeywords,
					images: {
						mainImage: formData.images.mainImage,
						additionalImages: formData.images.additionalImages,
					},
					pricing: {
						currency: "USD",
						costPrice: formData.pricing.costPrice,
					},
					stockQuantity: formData.stockQuantity,
					timestamps: {
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				});
				console.log("Product created with ID:", user.uid);
				alert("Product added successfully!");
				router.push("/");
				// ✅ Reset everything after submit
				setFormData({
					name: "",
					description: [],
					attributes: {
						brand: "",
						color: "",
						model: "",
						material: "",
					},
					category: "",
					searchKeywords: [],
					images: {
						mainImage: "",
						additionalImages: [],
					},
					pricing: {
						currency: "USD",
						costPrice: 0,
					},
					stockQuantity: 0,
					timestamps: {
						createdAt: new Date(),
						updatedAt: new Date(),
					},
				});
			} catch (error) {
				console.error("Error adding product:", error);
				alert("Error adding product. Please try again.");
			} finally {
				setIsSubmitting(false);
			}

			console.log("Form submitted:", formData);

			setErrors({});
		} else {
			console.log("Form validation failed:", errors);
		}
	};

	useEffect(() => {
		function handleClickOutside(event) {
			if (
				buttonDropdownRef.current &&
				!buttonDropdownRef.current.contains(event.target) &&
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
		<div>
			<Header />

			<div className="w-full flex justify-center items-center mt-10">
				<div className="w-300 ">
					<h2>Add New Product</h2>
					{/* Form fields for product details */}
					<form
						onSubmit={handleSubmit}
						className="relative px-20 py-5 space-y-10 border border-gray-300 rounded-md"
					>
						{/* Name */}
						<div className="flex justify-end space-x-3 mb-3">
							<label className="text-nowrap " htmlFor="name">
								Product Name:
							</label>
							<input
								type="text"
								id="name"
								value={formData.name}
								onChange={handleChange}
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 shadow-sm ${
									errors.name
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.name && (
								<p className="text-red-500 text-sm">
									{errors.name}
								</p>
							)}
						</div>
						{/* Description */}
						<div className=" space-x-3 mb-9">
							<div className="justify-end flex space-x-6">
								<label
									className="text-nowrap "
									htmlFor="details"
								>
									Product Description:
								</label>
								<div className="w-193 mb-10 ">
									<ul className="list-disc">
										{formData.description.map(
											(detail, index) => (
												<li
													key={index}
													className="text-sm"
												>
													{detail}
												</li>
											)
										)}
									</ul>
								</div>
							</div>
							<div className="justify-end flex items-center space-x-3 -mt-9">
								<input
									type="text"
									id="details"
									ref={inputDetailsRef}
									className={`border ml-auto shadow-sm  border-gray-300 outline-none rounded-md p-2 w-178 mb-3 ${
										errors.description
											? "border-red-500 focus:border-red-500"
											: "focus:border-blue-500"
									}`}
								/>
								<button
									onClick={handleConfirmDescription}
									type="button"
									className="py-2 px-3 -mt-3 bg-blue-400 rounded-md cursor-pointer"
								>
									confirm
								</button>
							</div>
						</div>
						<div className="ml-60 h-2 -mt-11 ">
							{errors.description && (
								<p className="text-red-500 text-sm">
									{errors.description}
								</p>
							)}
						</div>
						{/* Search keywords */}
						<div className=" space-x-3 mb-9">
							<div className="justify-end flex space-x-6">
								<label
									className="text-nowrap "
									htmlFor="searchKeywords"
								>
									Search Keywords:
								</label>
								<div className="w-193 mb-10 ">
									<ul className="list-disc">
										{formData.searchKeywords.map(
											(keyword, index) => (
												<li
													key={index}
													className="text-sm"
												>
													{keyword}
												</li>
											)
										)}
									</ul>
								</div>
							</div>
							<div className="justify-end flex items-center space-x-3 -mt-9">
								<input
									type="text"
									id="searchKeywords"
									ref={inputKeywordsRef}
									className={`border ml-auto shadow-sm  border-gray-300 outline-none rounded-md p-2 w-178 mb-3 ${
										errors.searchKeywords
											? "border-red-500 focus:border-red-500"
											: "focus:border-blue-500"
									}`}
								/>
								<button
									onClick={handleConfirmKeywords}
									type="button"
									className="py-2 px-3 -mt-3 bg-blue-400 rounded-md cursor-pointer"
								>
									confirm
								</button>
							</div>
						</div>
						<div className="ml-60 h-2 -mt-11 ">
							{errors.searchKeywords && (
								<p className="text-red-500 text-sm">
									{errors.searchKeywords}
								</p>
							)}
						</div>
						{/* Brand */}
						<div className="flex justify-end space-x-3 mb-3">
							<label className="text-nowrap " htmlFor="brand">
								Product Brand:
							</label>
							<input
								type="text"
								id="brand"
								value={formData.attributes.brand}
								onChange={handleChangeAttribute}
								className={`border shadow-sm border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
									errors.brand
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.brand && (
								<p className="text-red-500 text-sm">
									{errors.brand}
								</p>
							)}
						</div>
						{/* Category */}
						{/* Dropdown Button */}
						<div className="flex justify-end space-x-3 mb-3">
							<div className="text-nowrap relative flex ">
								Category:
								{/* Button with proper ARIA attributes */}
								<button
									ref={buttonDropdownRef}
									onClick={() => setOpen(!open)}
									type="button"
									aria-haspopup="true"
									aria-expanded={open}
									className={`flex items-center justify-between px-2 py-2  font-medium  ml-3 w-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${formData.category == "All" ? "text-gray-400" : "text-gray-900"}`}
								>
									<span>{formData.category == "All" ? "Select Category" : formData.category}</span>
									{/* Arrow down */}
									<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray"></div>
									{/* Chevron icon that rotates when open */}
								</button>
								{/* Dropdown menu */}
								{open && (
									<div
										ref={dropdownRef}
										className="absolute top-10 right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
										role="menu"
										aria-orientation="vertical"
										tabIndex={-1}
									>
										<div className="py-1 max-h-60 overflow-y-auto">
											{categories.map((category) => (
												<button
													key={category}
													onClick={() =>
														handleSelect(category)
													}
													className={`block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 `}
													role="menuitem"
													tabIndex={0}
												>
													{category}
												</button>
											))}
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="ml-60 h-2 -mt-2">
							{errors.category && (
								<p className="text-red-500 text-sm">
									{errors.category}
								</p>
							)}
						</div>
						{/* Pricing */}
						<div className="flex justify-end space-x-3 mb-3">
							<label className="text-nowrap " htmlFor="costPrice">
								Amount:
							</label>
							<input
								type="number"
								id="costPrice"
								value={formData.pricing.costPrice}
								onChange={handleChangePricing}
								className={`border border-gray-300 shadow-sm outline-none rounded-md p-2 w-200 mb-3 ${
									errors.costPrice
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.costPrice && (
								<p className="text-red-500 text-sm">
									{errors.costPrice}
								</p>
							)}
						</div>
						{/* Stock Quantity */}
						<div className="flex justify-end space-x-3 mb-3">
							<label
								className="text-nowrap "
								htmlFor="stockQuantity"
							>
								Stock Quantity:
							</label>
							<input
								type="number"
								id="stockQuantity"
								value={formData.stockQuantity}
								onChange={handleChange}
								className={`border border-gray-300 shadow-sm outline-none rounded-md p-2 w-200 mb-3 ${
									errors.stockQuantity
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.stockQuantity && (
								<p className="text-red-500 text-sm">
									{errors.stockQuantity}
								</p>
							)}
						</div>
						{/* Main Image */}
						<div className="flex justify-end space-x-3 mb-3">
							<label className="text-nowrap " htmlFor="mainImage">
								Main Image:
							</label>
							<input
								ref={mainImageRef}
								type="file"
								id="mainImage"
								// value={formData.images.mainImage}
								onChange={handleChangeImages}
								className={`border border-gray-300 shadow-sm outline-none rounded-md p-2 w-200 mb-3 ${
									errors.mainImage
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.mainImage && (
								<p className="text-red-500 text-sm">
									{errors.mainImage}
								</p>
							)}
						</div>
						{/* Additional Images */}
						<div className="justify-end flex mb-6 -mt-6 space-x-3">
							<button
								type="button"
								onClick={addImageInput}
								className="px-4 py-2 bg-blue-500 shadow-sm text-white rounded-md cursor-pointer"
							>
								+ Add another image
							</button>
						</div>
						{formData.images.additionalImages.map((img, index) => {
							return (
								<div
									key={index}
									className="flex justify-end space-x-3 mb-3"
								>
									<label
										className="text-nowrap "
										htmlFor={`additionalImages`}
									>
										Additional Images:
									</label>
									<input
										type="file"
										id={`additionalImages`}
										onChange={(e) =>
											handleChangeAddImages(e, index)
										}
										className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
											errors.additionalImages
												? "border-red-500 focus:border-red-500"
												: "focus:border-blue-500"
										}`}
									/>
								</div>
							);
						})}
						<div className="ml-60 h-2 -mt-5">
							{errors.additionalImages && (
								<p className="text-red-500 text-sm">
									{errors.additionalImages}
								</p>
							)}
						</div>
						{/* Removed input */}
						<div className="justify-end flex mb-6  space-x-3 -mt-8">
							<button
								type="button"
								onClick={removeImageInput}
								className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
							>
								- Remove
							</button>
						</div>

						{/* Submit Button */}
						<div className="text-center">
							<button
								type="submit"
								className="bg-blue-500 text-white rounded-md p-2 w-100 mt-5 cursor-pointer hover:bg-blue-600"
							>
								{isSubmitting ? "Submitting..." : "Submit"}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
