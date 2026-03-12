export const uploadFile = async (file) => {
	const data = new FormData();
	data.set("file", file);
	const res = await fetch("/api/files", { method: "POST", body: data });
	return res.json(); //return URL
};


