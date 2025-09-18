"use client";
import { useEffect, useState } from "react";
import {
	collection,
	getDoc,
	query,
	orderBy,
	updateDoc,
	doc,
	deleteDoc,
	onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/config";
import Image from "next/image";
import { Trash, Plus, Minus } from "lucide-react";
import Header from "../components/layout/Header";
import { useAuth } from "../context/AuthContext ";
import Link from "next/link";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
export default function CartPage() {
	const [cartItems, setCartItems] = useState([]);
	const { user } = useAuth();
	const [calculatedSubtotal, setCalculatedSubtotal] = useState(0);
	const [isLoading, setIsLoading] = useState(null);
	const handleAddToCart = async (item, num) => {
		setIsLoading(item.id);
		// Check user authentication
		if (!user) {
			alert("You must be signed in to add items to cart.");
			return;
		}
		const userId = user.uid;
		const cartItemRef = doc(db, "amazon-carts", userId, "items", item.id);
		try {
			const cartSnap = await getDoc(cartItemRef);
			if (cartSnap.exists()) {
				// 🔼 already in cart → increase quantity
				const currentQty = cartSnap.data().quantity;
				const price = cartSnap.data().price;
				const newQty = currentQty + num;
				if (newQty <= 0) {
					//  remove from cart
					await deleteDoc(cartItemRef);
					console.log("Item deleted:", item.name);
				} else {
					// 🔼 update quantity
					await updateDoc(cartItemRef, {
						quantity: newQty,
						subTotal: newQty * price,
					});
					console.log("Quantity updated:", newQty);
				}
			}
		} catch (err) {
			console.error("Error updating cart:", err);
		}
		setIsLoading(null);
	};

	const handleSuccess = () => {
		toast.success("Checkout successful!");
	};
	useEffect(() => {
		if (!user) {
			setCartItems([]);
			return;
		}

		const userId = user.uid;
		const itemsRef = collection(db, "amazon-carts", userId, "items");
		const q = query(itemsRef, orderBy("createdAt", "desc"));

		// 🔥 real-time listener
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const items = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setCartItems(items);

			// Calculate item subtotal
			let total = 0;
			items.forEach((doc) => {
				total += doc.subTotal;

				// Round to 2 decimal places to avoid floating point precision issues
				total = Math.round(total * 100) / 100;
			});

			setCalculatedSubtotal(total);
		});

		return () => unsubscribe(); // cleanup listener
	}, [user]);

	return (
		<div className="overflow-hidden">
			<Header />
			{cartItems.length === 0 ? (
				<p className="text-3xl font-bold mb-4 p-10 mt-20">
					Your Amazon Cart is empty.
				</p>
			) : (
				<div className="mt-20 justify-center items-center xl:items-start max-w-screen flex flex-col xl:flex-row">
					<div className="space-y-4 px-10  ">
						<h1 className="text-3xl mt-5  mb-4">Shopping Cart</h1>
						<div className=" m-0 lg:w-200 xl:w-240 2xl:w-290 flex px-5 text-gray-500 text-sm top-auto">
							<p className="ml-auto">Price</p>
						</div>
						<div className="border border-gray-300 mb-4 flex flex-col lg:w-200 xl:w-240 2xl:w-290  rounded-lg">
							{cartItems.map((item) => {
								// Only render items with quantity >= 1
								if (item.quantity < 1) return null;
								const price = item.price.toFixed(2); // always 2 decimals
								const [whole, decimal] = price.split(".");
								return (
									<div
										className={`flex w-full p-5 space-x-5 ${isLoading === item.id && 'opacity-50'}`}
										key={item.id}
									>
										{/* Image */}
										<Link
											href={`/products/${item.id}`}
											className="w-auto  items-center justify-center hidden md:block"
										>
											<Image
												src={item.image}
												alt={item.name}
												width={50}
												height={50}
												className="object-contain  w-[200px] h-[128px] p-1"
											/>
										</Link>

										{/* Description */}
										<div className="space-y-1">
											<Link
												href={`/products/${item.id}`}
												className=" md:w-80 lg:w-120 xl:w-160  2xl:w-180 line-clamp-2"
											>
												<h2 className="font-medium text-lg">
													{item.name}
												</h2>
											</Link>
											<div>
												<p
													className={`${
														item.stockQuantity
															? "text-green-700"
															: "text-red-700"
													} text-xs`}
												>
													{item.stockQuantity
														? "In Stock"
														: "Out of Stock"}
												</p>
											</div>
											<div>
												<p className="text-xs text-gray-500 font-semibold">
													FREE Shipping{" "}
													<span className="font-normal">
														to Philippines.
													</span>
												</p>
											</div>
											{/* Add or Less a quantity */}
											<div
												className={`flex space-x-4 border-3 font-bold border-yellow-300 rounded-xl w-27 items-center justify-center mt-3 h-8`}
											>
												<button
										disabled={isLoading === item.id}

													onClick={() =>
														handleAddToCart(
															item,
															-1
														)
													}
													className={`cursor-pointer `}
												>
													{item.quantity > 1 ? (
														<Minus 
															size={16}
															strokeWidth={3}
														/>
													) : (
														<Trash
															size={16}
															strokeWidth={3}
														/>
													)}
												</button>
												<div className="w-4 flex justify-center"> {isLoading === item.id? (
														<Loader2
															className="animate-spin"
															size={20}
															strokeWidth={3}
														/>
													) : item.quantity }</div>
												<button
										disabled={isLoading === item.id}

													onClick={() =>
														handleAddToCart(item, 1)
													}
													className="cursor-pointer"
												>
													<Plus
														size={16}
														strokeWidth={3}
													/>
												</button>
											</div>
										</div>

										{/* Price */}
										<div className="ml-auto relative px-5 font-bold">
											<span className="absolute top-0.75 text-xs">
												$
											</span>
											<span className="text-xl ml-2">
												{whole}
											</span>
											<span className="absolute top-0.75 text-xs">
												{decimal}
											</span>
										</div>
									</div>
								);
							})}
						</div>
					</div>
					<div className="my-10 xl:mt-18 w-60 space-y-4">
						<div className="w-60">
							Subtotal ({cartItems.length} items):
							<span className="font-bold ml-1">
								${calculatedSubtotal}
							</span>
						</div>
						<div>
							<button
								onClick={handleSuccess}
								className="bg-yellow-300 w-full py-1 rounded-2xl text-sm"
							>
								Proceed to checkout
							</button>{" "}
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
