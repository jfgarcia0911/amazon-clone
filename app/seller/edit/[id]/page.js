"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuth } from "../../../context/AuthContext ";
import { toast } from "react-toastify";
import Header from "../../../components/layout/Header";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";


export default function EditProduct() {
    const params = useParams();
  
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: [],
    attributes: { brand: "", color: "", model: "", material: "" },
    category: "",
    searchKeywords: [],
    images: { mainImage: "", additionalImages: [] },
    pricing: { currency: "USD", costPrice: 0 },
    stockQuantity: 0,
  });

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
  }, [params.id, user, router]);

  // Handle form field changes (reuse your existing handlers from AddProduct)
  const handleChange = (e) => { /* ... same as AddProduct ... */ };
  const handleChangeAttribute = (e) => { /* ... */ };
  const handleChangePricing = (e) => { /* ... */ };
  // Also reuse your description, keywords, image handlers (with slight modifications)

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const docRef = doc(db, "amazon-products", id);
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
      setSubmitting(false);
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
      <div className="w-full mt-20 flex justify-center">
        <div className="w-300">
          <h2>Edit Product</h2>
          <form onSubmit={handleSubmit} className="...">
            {/* Reuse the exact same form JSX as in AddProduct, 
                with values bound to formData */}
            {/* Example: */}
            <div className="flex justify-end space-x-3">
              <label htmlFor="name">Product Name:</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="..."
              />
            </div>
            {/* ... all other fields ... */}
            <button type="submit" disabled={submitting} className="...">
              {submitting ? <Loader2 className="animate-spin" /> : "Update Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}