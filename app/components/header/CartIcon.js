import React from "react";
import { ShoppingCart } from "lucide-react";
import useCartQuantity from "../../hooks/useCartQuantity";
import { useRouter } from "next/navigation";

export default function CartIcon({user}) {
  const cartQuantity = useCartQuantity(user)
    const router = useRouter();


  	const handleCartQuantity = () => {
		router.push("/cart");
	};

	return (
		<div
			onClick={handleCartQuantity}
			className="flex relative  items-center  border border-transparent  hover:border-white  py-2 cursor-pointer"
		>
			<div className="text-xs  flex items-baseline space-x-1">
				<ShoppingCart size={30} />
				<div className="relative">
					<span className="absolute -top-6 left-1 text-lg text-orange-300 text-center">
						{cartQuantity}
					</span>
					<span className="text-sm font-bold">Cart</span>
				</div>
			</div>
		</div>
	);
}
