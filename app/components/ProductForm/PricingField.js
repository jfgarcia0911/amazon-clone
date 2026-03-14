import React from "react";

export default function PricingField({
	label = "Amount:",
	id = "costPrice",
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
					type="number"
					id={id}
          step="0.01"
					value={formData}
					min={0}
					onChange={onChange}
					className={`border border-gray-300 shadow-sm outline-none rounded-md p-2 w-200 mb-3 ${
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
