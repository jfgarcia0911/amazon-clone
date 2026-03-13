import React, { useRef } from "react";


export default function ProductDescriptionField({
	label = "Product Description:",
	formData = [],	
	onClick,
	error,
	id = "details",
}) {
    const inputDetailsRef = useRef();

    const handleClick = (e) => {
    if (onClick) {
      onClick(inputDetailsRef.current.value, e); // pass value to parent
    }
    inputDetailsRef.current.value = "";
  };

  
	return (
		<>
			<div className=" space-x-3 mb-9">
				<div className="justify-end flex space-x-6">
					<label className="text-nowrap " htmlFor={id}>
						{label}
					</label>
					<div className="w-193 mb-10 ">
						<ul className="list-disc">
							{formData.map((detail, index) => (
								<li key={index} className="text-sm">
									{detail}
								</li>
							))}
						</ul>
					</div>
				</div>
				<div className="justify-end flex items-center space-x-3 -mt-9">
					<input
						type="text"
						id={id}
						ref={inputDetailsRef}
						className={`border ml-auto shadow-sm  border-gray-300 outline-none rounded-md p-2 w-178 mb-3 ${
							error
								? "border-red-500 focus:border-red-500"
								: "focus:border-blue-500"
						}`}
					/>
					<button
						onClick={handleClick}
						type="button"
						className="py-2 px-3 -mt-3 bg-blue-400 rounded-md cursor-pointer"
					>
						confirm
					</button>
				</div>
			</div>
			<div className="ml-60 h-2 -mt-11 ">
				{error && (
					<p className="text-red-500 text-sm">{error}</p>
				)}
			</div>
		</>
	);
}
