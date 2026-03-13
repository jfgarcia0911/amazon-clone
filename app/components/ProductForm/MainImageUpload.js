import React, { useEffect, useRef, useState } from "react";
import { Loader2, Check } from "lucide-react";

export default function MainImageUpload({
	label = "Main Image:",
	id = "mainImage",
	onChange,
	error,
  status,
  imageRef
}) {
	const mainImageRef = useRef();

  useEffect(()=> {
    if(imageRef && mainImageRef.current){
      mainImageRef.current.value = ""; //clear file input
    }
  }, [imageRef])

	return (
		<>
			<div className="flex relative justify-end space-x- mb-3">
				<label className="text-nowrap mr-3" htmlFor={id}>
					{label}
				</label>
				<input
					ref={mainImageRef}
					type="file"
					id={id}
					onChange={onChange}
					className={`border border-gray-300 shadow-sm outline-none rounded-md p-2 w-200 mb-3 ${
						error
							? "border-red-500 focus:border-red-500"
							: "focus:border-blue-500"
					}`}
				/>
				{status === "loading" && (
					<Loader2 className="animate-spin h-4 w-4 text-blue-500 absolute top-3 right-3" />
				)}
				{status === "success" && (
					<Check className="h-4 w-4 text-green-600 absolute top-3 right-3" />
				)}
				{status === "idle" && ""}
			</div>
			<div className="ml-60 h-2 -mt-5">
				{error && <p className="text-red-500 text-sm">{error}</p>}
			</div>
		</>
	);
}
