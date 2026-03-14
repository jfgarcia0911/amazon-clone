"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext ";
import { toast } from "react-toastify";
import Header from "../../../components/layout/Header";
import { Loader2 } from "lucide-react";
import { useParams,  useRouter} from "next/navigation";
import ProductNameField from "../../../components/ProductForm/ProductNameField";
import ProductDescriptionField from "../../../components/ProductForm/ProductDescriptionField";
import { useProductForm } from "../../../hooks/useProductForm";

export default function EditProduct() {
	const params = useParams();
	const { user } = useAuth();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {formData, setFormData, handleChange, handleConfirmDescription,handleEditDescription, errors} = useProductForm(params.id)

	// Fetch product data on mount
	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const docRef = doc(db, "amazon-products", params.id);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					const data = docSnap.data();
					setFormData(data);
				} else {
					toast.error("Product not found");
					router.push("/seller");
				}
			} catch (error) {
				console.error("Error fetching product:", error);
				toast.error("Failed to load product");
			} finally {
				setLoading(false);
			}
		};
		if (user) fetchProduct();
	}, [params.id, user, router, setFormData]);

	// Submit update
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);
		try {
			const docRef = doc(db, "amazon-products", params.id);
			await updateDoc(docRef, {
				...formData,
				timestamps: {
					...formData.timestamps,
					updatedAt: new Date(),
				},
			});
			toast.success("Product updated successfully!");
			router.push("/seller"); // or stay on the page
		} catch (error) {
			console.error("Error updating product:", error);
			toast.error("Update failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<Loader2 className="animate-spin" size={40} />
			</div>
		);
	}

	return (
		<div>
			<Header />
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
							onClick={handleConfirmDescription}
							error={errors.description}
              onEdit={handleEditDescription}   
						/>

						{/* Search keywords */}
						{/* <SearchField
                    formData={formData.searchKeywords}
                    error={errors.searchKeywords}
                    onClick={handleConfirmKeywords}
                  /> */}

						{/* Brand */}
						{/* <ProductBrandField
                    formData={formData.attributes.brand}
                    onChange={handleChangeAttribute}
                    error={errors.brand}
                  /> */}

						{/* Category */}
						{/* <CategoryField
                    formData={formData.category}
                    onSelect={handleSelect}
                    error={errors.category}
                  /> */}

						{/* Pricing */}
						{/* <PricingField
                    formData={formData.pricing.costPrice}
                    onChange={handleChangePricing}
                    error={errors.costPrice}
                  /> */}

						{/* Stock Quantity */}
						{/* <StockField
                    formData={formData.stockQuantity}
                    onChange={handleChange}
                    error={errors.stockQuantity}
                  /> */}

						{/* Main Image */}
						{/* <MainImageUpload
                    onChange={handleChangeImages}
                    error={errors.mainImage}
                    status={status}
                    imageRef={emptyImageValue}
                  /> */}

						{/* Additional Images */}
						{/* <AdditionalImagesList
                    onClick={updateImageInputs}
                    formData={formData.images.additionalImages}
                    onChange={handleChangeAddImages}
                    uploadStatus={uploadStatus}
                  /> */}

						{/* Submit Button */}
						<div className="text-center flex">
              <button
								type="button"
                onClick={() => router.push("/seller")}
								className="bg-red-500 text-white rounded-md p-2 w-100 mt-5 cursor-pointer hover:bg-red-600 mx-auto flex justify-center"
							>
								{isSubmitting ? (
									<Loader2 className="animate-spin" size={20} strokeWidth={3} />
								) : (
									"Back"
								)}
							</button>
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
