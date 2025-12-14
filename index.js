import express from "express";

const app = express();
const PORT = 5050;

app.all("/", (req, res) => {
	console.log("Request > ", { req }, req.headers["user-agent"]);
	console.log("Response > ", { res });
	res.send("Hey I'm up !");
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
