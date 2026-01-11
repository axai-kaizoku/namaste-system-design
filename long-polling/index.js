import express from "express";
import path from "path";

const app = express();
const PORT = 4044;

let data = "Initial Data";

const waitingClients = [];

app.get("/", (req, res) => {
	res.sendFile(path.join(import.meta.dirname, "index.html"));
});

app.get("/api/getData", (req, res) => {
	if (data !== req.query.lastData) {
		res.status(200).json({ data });
	} else {
		waitingClients.push(res);
	}
});

app.post("/api/updateData", (req, res) => {
	data = req.query.data;

	while (waitingClients.length > 0) {
		const client = waitingClients.pop();
		client.json({ data });
	}

	res.json({ message: "Data updated successfully", data });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
