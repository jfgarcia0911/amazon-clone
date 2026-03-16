"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShippingPage() {
	const [formData, setFormData] = useState({ address: "", phone: "" });
	const router = useRouter();

	const handleSubmit = (e) => {
		e.preventDefault();
		// Save shipping info to context or state
		router.push("/checkout/payment");
	};

	return (
		<form onSubmit={handleSubmit}>
			<h1>Shipping Information</h1>
			<input
				id="address"
				placeholder="Address"
				value={formData.address}
				onChange={(e) => setFormData({ ...formData, address: e.target.value })}
			/>
			<input
				id="phone"
				placeholder="Phone"
				value={formData.phone}
				onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
			/>
			<button type="submit">Continue to Payment</button>
		</form>
	);
}
