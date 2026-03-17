"use client";

import { Suspense } from "react"; // 👈 import Suspense
import Header from "../../components/layout/Header";
import React from "react";
import { Loader2 } from "lucide-react";
import { useProductForm } from "../../hooks/useProductForm";
import ProductNameField from "../../components/ProductForm/ProductNameField";
import ProductDescriptionField from "../../components/ProductForm/ProductDescriptionField";
import SearchField from "../../components/ProductForm/SearchField";
import ProductBrandField from "../../components/ProductForm/ProductBrandField";
import CategoryField from "../../components/ProductForm/CategoryField";
import PricingField from "../../components/ProductForm/PricingField";
import StockField from "../../components/ProductForm/StockField";
import MainImageUpload from "../../components/ProductForm/MainImageUpload";
import AdditionalImagesList from "../../components/ProductForm/AdditionalImagesList";
export default function AddProduct() {
	const {
		formData,
		status,
		uploadStatus,
		isSubmitting,
		emptyImageValue,
		errors,
		handleChange,
		handleChangeAttribute,
		handleChangePricing,
		handleChangeImages,
		handleChangeAddImages,
		handleAddFieldValue,
		handleSelect,
		updateImageInputs,
		handleSubmit,
	} = useProductForm();

	return (
		<div>
			<Suspense fallback={<div className="h-16 bg-gray-900" />}>
				<Header />
			</Suspense>

			<div className="w-full mt-20 flex justify-center items-center ">
				<div className="w-300 ">
					<h2>Add New Product</h2>
					{/* Form fields for product details */}
					<form
						onSubmit={handleSubmit}
						className={`${
							isSubmitting && "opacity-50"
						} relative px-20 py-5 space-y-10 border border-gray-300 rounded-md `}
					>
						{/* Name */}
						<ProductNameField
							formData={formData.name}
							onChange={handleChange}
							error={errors.name}
						/>

						{/* Description */}
						<ProductDescriptionField
							formData={formData.description}
							onClick={handleAddFieldValue}
							error={errors.description}
						/>

						{/* Search keywords */}
						<SearchField
							formData={formData.searchKeywords}
							error={errors.searchKeywords}
							onClick={handleAddFieldValue}
						/>

						{/* Brand */}
						<ProductBrandField
							formData={formData.attributes.brand}
							onChange={handleChangeAttribute}
							error={errors.brand}
						/>

						{/* Category */}
						<CategoryField
							formData={formData.category}
							onSelect={handleSelect}
							error={errors.category}
						/>

						{/* Pricing */}
						<PricingField
							formData={formData.pricing.costPrice}
							onChange={handleChangePricing}
							error={errors.costPrice}
						/>

						{/* Stock Quantity */}
						<StockField
							formData={formData.stockQuantity}
							onChange={handleChange}
							error={errors.stockQuantity}
						/>

						{/* Main Image */}
						<MainImageUpload
							onChange={handleChangeImages}
							error={errors.mainImage}
							status={status}
							imageRef={emptyImageValue}
						/>

						{/* Additional Images */}
						<AdditionalImagesList
							onClick={updateImageInputs}
							formData={formData.images.additionalImages}
							onChange={handleChangeAddImages}
							uploadStatus={uploadStatus}
						/>

						{/* Submit Button */}
						<div className="text-center">
							<button
								type="submit"
								className="bg-blue-500 text-white rounded-md p-2 w-100 mt-5 cursor-pointer hover:bg-blue-600 mx-auto flex justify-center"
							>
								{isSubmitting ? (
									<Loader2 className="animate-spin" size={20} strokeWidth={3} />
								) : (
									"Submit"
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}
