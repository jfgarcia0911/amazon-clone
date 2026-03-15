import React, { useState } from "react";

import Image from "next/image";

export default function LanguageSelector() {
	const [languageCode, setLanguageCode] = useState("EN");
	const [flag, setFlag] = useState("./us-flag.png");
	const languages = [
		{ language: "English", code: "EN", flag: "/us-flag.png" },
		{ language: "español", code: "ES", flag: "/es-flag.png" },
		{ language: "العربية ", code: "AR", flag: "/ar-flag.png" },
		{ language: "Deutsch ", code: "DE", flag: "/de-flag.png" },
		{ language: "עברית ", code: "HE", flag: "/he-flag.png" },
		{ language: "한국어 ", code: "KO", flag: "/ko-flag.png" },
		{ language: "português ", code: "PT", flag: "/pt-flag.png" },
		{ language: "中文(简体)", code: "ZH", flag: "/zh-flag.png" },
	];

	const handleClick = (code, flag) => {
		setLanguageCode(code);
		setFlag(flag);
	};
	return (
		<div className="flex relative group  items-center  ">
			<div className="flex space-x-1 border border-transparent  group-hover:border-white cursor-pointer py-3 px-1 w-14">
				<Image
					src={flag}
					alt="Logo"
					width={20}
					height={20}
					priority
					className="object-contain "
				/>
				<div>{languageCode}</div>
			</div>
			{/* Arrow Down */}
			<div className="relative border-l-4 border-t-4 border-r-4 border-l-transparent border-r-transparent cursor-pointer">
				{/* <!-- Triangle at the top --> */}
				<div className="absolute bg-white h-4 w-4 rotate-45 top-4 -left-2  hidden   group-hover:block "></div>
			</div>
			{/* <!-- Tooltip container (hidden by default) --> */}
			<div className="absolute hidden  group-hover:block top-12 left-0 mt- w-52 bg-white border border-gray-300 rounded shadow-lg z-50">
				{/* <!-- Tooltip content --> */}
				<div className="p-2 text-black">
					<h1 className="text-sm">
						Change Language{" "}
						<span className="underline text-blue-500 text-xs">Learn more</span>
					</h1>

					<div className="mt-2 space-y-2">
						{languages.map((lang) => (
							<label
								key={lang.language}
								onClick={() => handleClick(lang.code, lang.flag)}
								className="flex items-center space-x-1 text-sm cursor-pointer hover:underline hover:text-orange-500"
							>
								<input
									type="radio"
									name="language"
									value={lang.code}
									defaultChecked={languageCode === lang.code}
									className="h-4 w-4 cursor-pointer"
								/>
								<span>
									{lang.language} - {lang.code}
								</span>
							</label>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
