// components/common/ProductNameField.jsx
import React from "react";

export default function ProductNameField({
	label = "Product Name:",
	id = "name",
	formData,
	onChange,
	error,
}) {
	return (
		<>
			<div className="flex justify-end space-x-3 mb-3">
				<label htmlFor={id} className="text-nowrap">
					{label}
				</label>
				<input
					type="text"
					id={id}
					value={formData}
					onChange={onChange}
					className={`border border-gray-300 outline-none rounded-md p-2 w-200 mb-3 shadow-sm ${
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
