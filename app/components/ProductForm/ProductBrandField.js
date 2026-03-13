import React from "react";

export default function ProductBrandField({
	label = "Product Brand:",
	id = "brand",
	formData,
	onChange,
	error,
}) {
	return (
		<>
			<div className="flex justify-end space-x-3 mb-3">
				<label className="text-nowrap " htmlFor={id}>
					{label}
				</label>
				<input
					type="text"
					id={id}
					value={formData}
					onChange={onChange}
					className={`border shadow-sm border-gray-300 outline-none rounded-md p-2 w-200 mb-3 ${
						error
							? "border-red-500 focus:border-red-500"
							: "focus:border-blue-500"
					}`}
				/>
			</div>
			<div className="ml-60 h-2 -mt-5">
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
		</>
	);
}
