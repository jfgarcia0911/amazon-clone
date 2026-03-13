import React, { useRef, useState, useEffect } from "react";
import CategoriesSelect from "../common/CategoriesSelect";

export default function CategoryField({
  label = "Category:",
  formData,
  onSelect,
  error
}) {
	const [open, setOpen] = useState(false);
	const buttonDropdownRef = useRef();
	const dropdownRef = useRef();

  const handleSelect = (category) => {
    if(onSelect){
      onSelect(category)
    }
    setOpen(false);
  }

  // If the user clicks anywhere else on the document, it closes the dropdown.
  useEffect(() => {
      function handleClickOutside(event) {
        if (
          buttonDropdownRef.current &&
          !buttonDropdownRef.current.contains(event.target) &&
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target)
        ) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  
	return (
		<>
			{/* Dropdown Button */}
			<div className="flex justify-end space-x-3 mb-3">
				<div className="text-nowrap relative flex ">
					{label}
					{/* Button with proper ARIA attributes */}
					<button
						ref={buttonDropdownRef}
						onClick={() => setOpen(!open)}
						type="button"
						aria-haspopup="true"
						aria-expanded={open}
						className={`flex items-center justify-between px-2 py-2  font-medium  ml-3 w-200 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							formData == "All" ? "text-gray-400" : "text-gray-900"
						}`}
					>
						<span>
							{formData == "All"
								? "Select Category"
								: formData}
						</span>
						{/* Arrow down Icon*/}
						<div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray"></div>
					</button>
					{/* Dropdown menu */}
					{open && (
						<div
							ref={dropdownRef}
							className="absolute top-10 right-0 z-10 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
							role="menu"
							aria-orientation="vertical"
							tabIndex={-1}
						>
							<CategoriesSelect onSelect={handleSelect} />
						</div>
					)}
				</div>
			</div>
			<div className="ml-60 h-2 -mt-2">
				{error && (
					<p className="text-red-500 text-sm">{error}</p>
				)}
			</div>
		</>
	);
}
