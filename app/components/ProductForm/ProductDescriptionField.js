import React, { useRef, useState } from "react";

export default function ProductDescriptionField({
	label = "Product Description:",
	formData = [],
	onClick,
	onEdit, // new callback for editing
	error,
	id = "details",
}) {
	const inputDetailsRef = useRef();
	const [editingIndex, setEditingIndex] = useState(null);
	const [editValue, setEditValue] = useState("");

	const handleAdd = (e) => {
		if (onClick) {
			onClick(inputDetailsRef.current.value, e);
		}
		inputDetailsRef.current.value = "";
	};

	const startEdit = (index, value) => {
		setEditingIndex(index);
		setEditValue(value);
	};

	const confirmEdit = () => {
		if (onEdit) {
			onEdit(editingIndex, editValue); // pass index + new value to parent
		}
		setEditingIndex(null);
		setEditValue("");
	};

	return (
		<>
			<div className="space-x-3 mb-9">
				<div className="justify-end flex space-x-6">
					<label className="text-nowrap" htmlFor={id}>
						{label}
					</label>
					<div className="w-193 mb-10">
						<ul className="list-disc">
							{formData.map((detail, index) => (
								<li key={index} className="text-sm flex items-center space-x-2">
									{editingIndex === index ? (
										<>
											<input
												type="text"
												value={editValue}
												onChange={(e) => setEditValue(e.target.value)}
												className="border  border-gray-300 rounded-md p-2 w-178"
											/>
											<button
												type="button"
												onClick={confirmEdit}
												className="bg-green-500 text-white px-2 ml-auto rounded-md cursor-pointer"
											>
												Save
											</button>
										</>
									) : (
										<>
											<ul className="list-disc ">
												<li className="p-2">{detail}</li>
											</ul>

											<button
												type="button"
												onClick={() => startEdit(index, detail)}
												className="text-blue-500 text-xs ml-auto  underline cursor-pointer"
											>
												Edit
											</button>
										</>
									)}
								</li>
							))}
						</ul>
					</div>
				</div>

				{/* Add new description */}
				<div className="justify-end flex items-center space-x-3 -mt-9">
					<input
						type="text"
						id={id}
						ref={inputDetailsRef}
						className={`border ml-auto shadow-sm border-gray-300 outline-none rounded-md p-2 w-178 mb-3 ${
							error
								? "border-red-500 focus:border-red-500"
								: "focus:border-blue-500"
						}`}
					/>
					<button
						onClick={handleAdd}
						type="button"
						className="py-2 px-3 -mt-3 bg-blue-400 rounded-md cursor-pointer"
					>
						Confirm
					</button>
				</div>
			</div>

			<div className="ml-60 h-2 -mt-11">
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
		</>
	);
}
