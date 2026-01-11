import express from "express";
import path from "path";

const app = express();

const PORT = 4043;

app.get("/", (req, res) => {
	const filePath = path.join(import.meta.dirname, "index.html");

	res.sendFile(filePath);
});

let data = [
	{
		id: 1,
		name: "John Doe",
		email: "john.doe@example.com",
		age: 25,
	},
];

app.get("/api/getData", (req, res) => {
	res.status(200).json({ data });
});

app.post("/api/updateData", (req, res) => {
	data.push({
		id: data.length + 1,
		name: "Jane Doe",
		email: "jane.doe@example.com",
		age: 26,
	});
	res.status(200).json({ data });
});

app.delete("/api/deleteData", (req, res) => {
	data = [];
	res.status(200).json({ data });
});

app.listen(PORT, () => {
	console.log("short polling server started on port " + PORT);
});
