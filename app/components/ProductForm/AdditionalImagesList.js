import React from "react";
import { Loader2, Check } from "lucide-react";

export default function AdditionalImagesList({
	label = "Additional Images:",
	id = "additionalImages",
	formData,
	onClick,
	onChange,
	uploadStatus,
	error,
}) {
	return (
		<>
			<div className="justify-end flex mb-6 -mt-6 space-x-3">
				<button
					type="button"
					onClick={() => onClick("add")}
					className="px-4 py-2 bg-blue-500 shadow-sm text-white rounded-md cursor-pointer"
				>
					+ Add another image
				</button>
			</div>
			{formData.map((value, index) => {
				const status = uploadStatus[index] || "idle";
				return (
					<div
						key={`imagesAt-${index}`}
						className="flex relative justify-end  mb-3"
					>
						<label className={`text-nowrap mr-3 `} htmlFor={id}>
							{index === 0 ? label : ""}
						</label>
						<input
							type="file"
							id={id}
							onChange={(e) => onChange(e, index)}
							className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
								error
									? "border-red-500 focus:border-red-500"
									: "focus:border-blue-500"
							}`}
						/>
						{status === "loading" && (
							<Loader2 className="absolute top-2 right-3 animate-spin h-4 w-4 text-blue-500" />
						)}
						{status === "success" && (
							<Check className="absolute top-2 right-3 h-4 w-4 text-green-600" />
						)}
					</div>
				);
			})}
			<div className="ml-60 h-2 -mt-5">
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
			{/* Removed input */}
			<div className="justify-end flex mb-6  space-x-3 -mt-8">
				<button
					type="button"
					onClick={() => onClick("remove")}
					className="px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer"
				>
					- Remove
				</button>
			</div>
		</>
	);
}
