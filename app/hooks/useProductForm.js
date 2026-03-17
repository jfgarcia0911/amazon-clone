import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
	collection,
	addDoc,
	doc,
	deleteDoc,
	query,
	where,
	getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { toast } from "react-toastify";
import { uploadFile } from "../utils/uploadFile";

export const useProductForm = (productId = null) => {
	const { user } = useAuth();
	const [products, setProducts] = useState([]);
	const [status, setStatus] = useState("idle");
	const [uploadStatus, setUploadStatus] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [emptyImageValue, setEmptyImageValue] = useState(false);
	const [errors, setErrors] = useState({});
	const [formData, setFormData] = useState({
		name: "",
		description: [],
		attributes: { brand: "", color: "", model: "", material: "" },
		category: "All",
		searchKeywords: [],
		images: { mainImage: "", additionalImages: [] },
		pricing: { currency: "USD", costPrice: 0 },
		stockQuantity: 0,
		timestamps: { createdAt: new Date(), updatedAt: new Date() },
	});

	// Generic field change handlers
	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		clearFieldError(id);
	};

	const handleChangeAttribute = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			attributes: { ...prev.attributes, [id]: value },
		}));
		clearFieldError(id);
	};

	const handleChangePricing = (e) => {
		const { id, value } = e.target;
		setFormData((prev) => ({
			...prev,
			pricing: { ...prev.pricing, [id]: Number(value) },
		}));
		clearFieldError(id);
	};

	// Image upload handlers
	const handleChangeImages = async (e) => {
		setStatus("loading");
		const file = e.target.files[0];
		if (file) {
			const imgUrl = await uploadFile(file);
			setFormData((prev) => ({
				...prev,
				images: { ...prev.images, mainImage: imgUrl },
			}));
			toast.success("Upload successful");
			setStatus("success");
		} else {
			setFormData((prev) => ({
				...prev,
				images: { ...prev.images, mainImage: "" },
			}));
			setStatus("idle");
		}
		clearFieldError("mainImage");
	};

	const handleChangeAddImages = async (e, index) => {
		setUploadStatus((prev) => ({ ...prev, [index]: "loading" }));
		const file = e.target.files[0];
		if (file) {
			const imgUrl = await uploadFile(file);
			setFormData((prev) => {
				const newImages = [...prev.images.additionalImages];
				newImages[index] = imgUrl;
				return {
					...prev,
					images: { ...prev.images, additionalImages: newImages },
				};
			});
			toast.success("Upload successful");
			setUploadStatus((prev) => ({ ...prev, [index]: "success" }));
		} else {
			setFormData((prev) => {
				const newImages = [...prev.images.additionalImages];
				newImages[index] = "";
				return {
					...prev,
					images: { ...prev.images, additionalImages: newImages },
				};
			});
			setUploadStatus((prev) => ({ ...prev, [index]: "idle" }));
		}
		clearFieldError(`additionalImages-${index}`);
	};

	// Confirm handlers for description and keywords
	const handleAddFieldValue = (field, value, e) => {
		e.preventDefault();
		if (value.trim()) {
			setFormData((prev) => ({
				...prev,
				[field]: [...prev[field], value.trim()],
			}));
		}
		clearFieldError(field);
	};

	// Add/remove additional image inputs
	const updateImageInputs = (action) => {
		setFormData((prev) => {
			let updatedImages = [...prev.images.additionalImages];
			if (action === "add") {
				updatedImages.push("");
			} else if (action === "remove" && updatedImages.length > 0) {
				updatedImages.pop();
			}
			return {
				...prev,
				images: { ...prev.images, additionalImages: updatedImages },
			};
		});
	};

	// Category select
	const handleSelect = (cat) => {
		setFormData((prev) => ({ ...prev, category: cat }));
		clearFieldError("category");
	};

	// Validation
	const validateForm = () => {
		const newErrors = {};
		if (!formData.name.trim()) newErrors.name = "Product name is required";
		if (!formData.description.length)
			newErrors.description = "Product description is required";
		if (!formData.attributes.brand.trim())
			newErrors.brand = "Product brand is required";
		if (formData.category === "All") newErrors.category = "Choose a category";
		if (!formData.searchKeywords.length)
			newErrors.searchKeywords = "At least one search keyword is required";
		if (!formData.pricing.costPrice || formData.pricing.costPrice <= 0)
			newErrors.costPrice = "Cost price must be greater than zero";
		if (formData.stockQuantity < 0)
			newErrors.stockQuantity = "Stock quantity cannot be negative";
		if (!formData.images.mainImage)
			newErrors.mainImage = "Main image is required";
		if (formData.images.additionalImages.some((img) => !img))
			newErrors.additionalImages = "Remove or provide all additional images";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const clearFieldError = (field) => {
		if (errors[field]) {
			setErrors((prev) => ({ ...prev, [field]: "" }));
		}
	};

	// Submit (refactored to handle add or update)
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!validateForm()) {
			console.log("Form validation failed:", errors);
			return;
		}
		setIsSubmitting(true);
		try {
			if (productId) {
				// Update existing product
				const docRef = doc(db, "amazon-products", productId);
				await updateDoc(docRef, {
					...formData,
					timestamps: {
						...formData.timestamps,
						updatedAt: new Date(),
					},
				});
				toast.success("Product updated successfully!");
			} else {
				// Add new product
				await addDoc(collection(db, "amazon-products"), {
					userId: user.uid,
					...formData,
					timestamps: { createdAt: new Date(), updatedAt: new Date() },
				});
				toast.success("Product added successfully!");
				resetForm();
			}
		} catch (error) {
			console.error("Error saving product:", error);
			toast.error("Error saving product. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

	// Fetch seller products
	const fetchSellerProducts = async (userId) => {
		try {
			const q = query(
				collection(db, "amazon-products"),
				where("userId", "==", userId),
			);
			const querySnapshot = await getDocs(q);
			const products = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setProducts(products);
		} catch (error) {
			console.error("Error fetching products:", error);
			toast.error("Failed to fetch products");
		}
	};

	// delete handler
	const handleDelete = async (id) => {
		if (!id) {
			toast.error("No product to delete");
			return;
		}
		setIsSubmitting(true);
		try {
			const docRef = doc(db, "amazon-products", id);
			await deleteDoc(docRef);
			toast.success("Product deleted successfully!");
		} catch (error) {
			console.error("Error deleting product:", error);
			toast.error("Delete failed. Please try again.");
		} finally {
			setIsSubmitting(false);
		}
	};

  // Handles editing array-based form fields (e.g., keywords, descriptions).
	const handleEditFieldArray = (field,index, newValue) => {
		const trimmed = newValue.trim();
		setFormData((prev) => {
			if (trimmed === "") {
				// Remove the item completely
				const updatedArray = prev[field].filter(
					(_, i) => i !== index,
				);
				return { ...prev, [field]: updatedArray };
			} else {
				// Update the item with the new value
				const updatedArray = [...prev[field]];
				updatedArray[index] = trimmed;
				return { ...prev, [field]: updatedArray };
			}
		});
		clearFieldError(field);
	};

	const resetForm = () => {
		setFormData({
			name: "",
			description: [],
			attributes: { brand: "", color: "", model: "", material: "" },
			category: "All",
			searchKeywords: [],
			images: { mainImage: "", additionalImages: [] },
			pricing: { currency: "USD", costPrice: 0 },
			stockQuantity: 0,
			timestamps: { createdAt: new Date(), updatedAt: new Date() },
		});
		setEmptyImageValue(true); // signal to reset file input
		setStatus("idle");
		setUploadStatus({});
		setErrors({});
	};

	return {
		formData,
		setFormData,
		handleEditFieldArray,
		status,
		products,
		fetchSellerProducts,
		uploadStatus,
		isSubmitting,
		emptyImageValue,
		errors,
		handleDelete,
		handleChange,
		handleChangeAttribute,
		handleChangePricing,
		handleChangeImages,
		handleChangeAddImages,
		handleAddFieldValue,
		handleSelect,
		updateImageInputs,
		handleSubmit,
		resetForm, // optional
	};
};
