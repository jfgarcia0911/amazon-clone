"use client";

import Header from "../../components/layout/Header";
import React, { useRef, useState } from "react";
import { db } from "../../firebase/config";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext ";
import { useRouter } from "next/navigation";

export default function AddProduct() {
	const { user } = useAuth();
	const mainImageRef = useRef();
	const inputDetailsRef = useRef();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		description: [],
		// description: "",
		attributes: {
			brand: "",
			color: "",
			model: "",
			material: "",
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
		if(errors.description){
			setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
		}
		console.log("Detail confirmed:", formData.description);
		inputDetailsRef.current.value = "";
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
					subcategory: formData.subcategory,
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
					description: "",
					attributes: {
						brand: "",
						color: "",
						model: "",
						material: "",
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
						<div className=" space-x-3 mb-9">
							<div className="justify-end flex space-x-6">
								<label
									className="text-nowrap "
									htmlFor="details"
								>
									Product Description:
								</label>
								<div className="w-193 ">
									<ul className="list-disc">
										{formData.description.map(
											(detail, index) => (
												<li key={index}>{detail}</li>
											)
										)}
									</ul>
								</div>
							</div>
							<div className="justify-end flex items-center space-x-3 mt-2">
								<input
									type="text"
									id="details"
									ref={inputDetailsRef}
									className={`border ml-auto  border-gray-300 outline-none rounded-md p-2 w-178 mb-3 ${
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
								ref={mainImageRef}
								type="file"
								id="mainImage"
								// value={formData.images.mainImage}
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
								onClick={addImageInput}
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
