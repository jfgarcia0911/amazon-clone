"use client";

import Header from "@/app/components/layout/Header";
import React, { useState } from "react";

export default function AddProduct() {
	const [images, setImages] = useState([]);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		description: "",
		attributes: {
			brand: "",
			color: "Black",
			model: "WH-1000XM4",
			material: "Plastic",
		},
		category: "",
		subcategory: "",
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
				[id]: value,
			},
		}));
		if (errors[id]) {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
		}
	};
	const handleChangeImages = (e) => {
		const { id, value } = e.target;
		setFormData((prevData) => ({
			...prevData,
			images: {
				...prevData.images,
				[id]: value,
			},
		}));
		if (errors[id]) {
			setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
		}
		const file = e.target.files[0];
		console.log(file);
	};

	const handleAddImages = (e, index) => {
		setFormData((prev) => {
			const newImages = [...prev.images.additionalImages];
			newImages[index] = e.target.value; // replace or set at index
			return {
				...prev,
				images: {
					...prev.images,
					additionalImages: newImages,
				},
			};
		});
	};
	const addImages = (e) => {
		// setImages([...images, ""]);
		setFormData((prev) => ({
			...prev,
			images: {
				...prev.images,
				additionalImages: [...prev.images.additionalImages, ""],
			},
		}));
		console.log(123);
	};

	const removeImages = (e) => {
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
		if (!formData.description.trim()) {
			newErrors.description = "Product description is required";
		}
		if (!formData.attributes.brand.trim()) {
			newErrors.brand = "Product brand is required";
		}
		if (!formData.category.trim()) {
			newErrors.category = "Product category is required";
		}
		if (!formData.subcategory.trim()) {
			newErrors.subcategory = "Product sub-category is required";
		}
		if (!formData.pricing.costPrice || formData.pricing.costPrice <= 0) {
			newErrors.costPrice = "Cost price must be greater than zero";
		}
		if (!formData.stockQuantity || formData.stockQuantity < 0) {
			newErrors.stockQuantity = "Stock quantity cannot be negative";
		}
		if (!formData.images.mainImage.trim()) {
			newErrors.mainImage = "Main image is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0; // Return true if no errors
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (validateForm()) {
			// Handle form submission logic here
			console.log("Form submitted:", formData);
		} else {
			console.log("Form validation failed:", errors);
		}
	};
	return (
		<div>
			<Header />

			<div
				onSubmit={handleSubmit}
				className="w-full flex justify-center items-center mt-10"
			>
				<div className="w-300 ">
					<h2>Add New Product</h2>
					<form className="relative px-20 py-5 space-y-10 border border-gray-300 rounded-md">
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
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
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
						<div className="flex justify-end space-x-3 mb-3">
							<label
								className="text-nowrap "
								htmlFor="description"
							>
								Product Description:
							</label>
							<input
								type="text"
								id="description"
								value={formData.description}
								onChange={handleChange}
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
									errors.description
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.description && (
								<p className="text-red-500 text-sm">
									{errors.description}
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
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
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
						<div className="flex justify-end space-x-3 mb-3">
							<label className="text-nowrap " htmlFor="category">
								Category:
							</label>
							<input
								type="text"
								id="category"
								value={formData.category}
								onChange={handleChange}
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
									errors.category
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.category && (
								<p className="text-red-500 text-sm">
									{errors.category}
								</p>
							)}
						</div>
						{/* Sub Category */}
						<div className="flex justify-end space-x-3 mb-3">
							<label
								className="text-nowrap "
								htmlFor="subcategory"
							>
								Sub Category:
							</label>
							<input
								type="text"
								id="subcategory"
								value={formData.subcategory}
								onChange={handleChange}
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
									errors.subcategory
										? "border-red-500 focus:border-red-500"
										: "focus:border-blue-500"
								}`}
							/>
						</div>
						<div className="ml-60 h-2 -mt-5">
							{errors.subcategory && (
								<p className="text-red-500 text-sm">
									{errors.subcategory}
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
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
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
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
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
								type="file"
								id="mainImage"
								value={formData.images.mainImage}
								onChange={handleChangeImages}
								className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
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
								onClick={removeImages}
								className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
							>
								- Remove
							</button>
							<button
								type="button"
								onClick={addImages}
								className="px-4 py-2 bg-blue-500 text-white rounded-md cursor-pointer"
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
										value={
											formData.images.additionalImages[
												index
											]
										}
										onChange={(e) =>
											handleAddImages(e, index)
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

						{/* Form fields for product details */}
						<div className="text-center">
							<button
								type="submit"
								className="bg-blue-500 text-white rounded-md p-2 w-100 mt-5 cursor-pointer hover:bg-blue-600"
							>
								Add Product
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
