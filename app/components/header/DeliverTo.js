import React from "react";
import { MapPin, ShoppingCart } from "lucide-react";

export default function DeliverTo() {
	return (
		<div className="text-xs relative w-[110px] leading-none border border-transparent  hover:border-white px-1 py-2 cursor-pointer">
			<MapPin size={20} className="absolute top-4 left-1 " />
			<div className="ml-5">Deliver to</div>
			<span className="text-sm font-bold block ml-5 ">Philippines</span>
		</div>
	);
}
