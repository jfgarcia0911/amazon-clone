import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function Logo() {
  const router = useRouter()
	return (
		<div
			onClick={() => router.push("/")}
			className="relative w-[112px]  flex items-center justify-center hover:border-1 py-2 px-1  cursor-pointer"
		>
			<h1 className="text-3xl font-bold -mt-4">amazon</h1>
			<div className="absolute top-5 left-2">
				<Image
					src="/amazon.png"
					alt="Logo"
					width={100}
					height={10}
					priority
					className="object-contain flex-shrink-0 w-16 h-5"
				/>
			</div>
		</div>
	);
}
